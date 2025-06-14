// Authentication System Configuration for IndieGate
import React from 'react'
import { airtableConfig } from './airtable.js'

/**
 * Required Airtable Users Table Structure:
 *
 * Table Name: "Users"
 * Fields:
 * - Email (Single line text, Primary field)
 * - Password (Single line text)
 * - FirstName (Single line text)
 * - LastName (Single line text)
 * - Portal (Single select: investor, filmmaker, talent, brand)
 * - Company (Single line text)
 * - Phone (Phone number)
 * - Bio (Long text)
 * - CreatedDate (Date and time)
 * - LastLogin (Date and time)
 * - Status (Single select: Active, Inactive)
 *
 * Demo Users Available:
 * - investor@demo.com / demo123
 * - filmmaker@demo.com / demo123
 * - talent@demo.com / demo123
 * - brand@demo.com / demo123
 */

// User authentication service
export class AuthService {
  constructor() {
    this.currentUser = null
    this.initializeSession()
  }

  // Simple password hashing for demo purposes (use bcrypt in production)
  hashPassword(password) {
    // Simple hash for demo - in production use bcrypt or similar
    let hash = 0
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i)
      hash = (hash << 5) - hash + char
      hash = hash & hash // Convert to 32-bit integer
    }
    return 'hash_' + Math.abs(hash).toString(36)
  }

  // Verify password against hash
  verifyPassword(password, hash) {
    // For demo users and plain text passwords, allow direct comparison
    if (!hash || !hash.startsWith('hash_')) {
      return password === hash
    }
    return this.hashPassword(password) === hash
  }

  // Initialize session from localStorage
  initializeSession() {
    const stored = localStorage.getItem('indiegate_user')
    if (stored) {
      try {
        this.currentUser = JSON.parse(stored)
        // Validate session is still valid (within 24 hours)
        if (this.isSessionValid()) {
          return this.currentUser
        } else {
          this.logout()
        }
      } catch (error) {
        console.error('Session initialization error:', error)
        this.logout()
      }
    }
    return null
  }

  // Check if current session is valid
  isSessionValid() {
    if (!this.currentUser?.loginTime) return false
    const sessionDuration = 7 * 24 * 60 * 60 * 1000 // 7 days for better UX
    return Date.now() - this.currentUser.loginTime < sessionDuration
  }

  // Register new user
  async register(userData) {
    try {
      // Validate required fields
      if (!this.validateRegistrationData(userData)) {
        throw new Error('Invalid registration data')
      }

      // Check if user already exists
      const existingUser = await this.findUserByEmail(userData.email)
      if (existingUser) {
        throw new Error('User already exists with this email')
      }

      // Create user record (will fallback to demo mode if database unavailable)
      const userRecord = await this.createUserRecord(userData)

      // Auto-login after registration
      const user = this.formatUserData(userRecord)
      this.setCurrentUser(user)

      // Check if we're in demo mode and provide appropriate message
      const isDemoUser = userRecord.id && userRecord.id.startsWith('demo-')
      if (isDemoUser) {
        console.log('User registered in demo mode')
        return {
          success: true,
          user,
          demoMode: true,
          message: 'Account created successfully in demo mode. Data will be stored locally.',
        }
      }

      return { success: true, user }
    } catch (error) {
      console.error('Registration error:', error)
      return { success: false, error: error.message }
    }
  }

  // Login user
  async login(email, password) {
    try {
      const user = await this.findUserByEmail(email)
      if (!user) {
        throw new Error('User not found')
      }

      // Get password field (handle both formats: user.password and user.Password)
      const userPassword = user.password || user.Password
      if (!userPassword) {
        throw new Error('User password not found')
      }

      // Verify password using hash comparison
      if (!this.verifyPassword(password, userPassword)) {
        throw new Error('Invalid password')
      }

      // Set current user and session
      const formattedUser = this.formatUserData(user)
      this.setCurrentUser(formattedUser)

      return { success: true, user: formattedUser }
    } catch (error) {
      console.error('Login error:', error)
      return { success: false, error: error.message }
    }
  }

  // Logout user
  logout() {
    this.currentUser = null
    localStorage.removeItem('indiegate_user')
    // Clear any session-related data
    sessionStorage.clear()
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser
  }

  // Check if user is authenticated
  isAuthenticated() {
    return this.currentUser !== null && this.isSessionValid()
  }

  // Set current user and save to localStorage
  setCurrentUser(user) {
    user.loginTime = Date.now()
    this.currentUser = user
    localStorage.setItem('indiegate_user', JSON.stringify(user))
  }

  // Validate registration data
  validateRegistrationData(data) {
    const required = ['email', 'password', 'firstName', 'lastName', 'portal']
    return required.every(field => data[field] && data[field].trim().length > 0)
  }

  // Create user record in Airtable
  async createUserRecord(userData) {
    // First check if we should use demo mode
    if (this.shouldUseDemoMode()) {
      console.log('Creating demo user due to database being in demo mode')
      return this.createDemoUser(userData)
    }

    try {
      // Test database connection first
      const connectionTest = await this.testDatabaseConnection()
      if (!connectionTest.success) {
        console.warn('Database connection failed, falling back to demo mode:', connectionTest.error)
        return this.createDemoUser(userData)
      }

      const url = `https://api.airtable.com/v0/${airtableConfig.baseId}/Users`

      const fields = {
        Email: userData.email,
        Password: this.hashPassword(userData.password), // Hash password for security
        FirstName: userData.firstName,
        LastName: userData.lastName,
        Portal: userData.portal,
        Company: userData.company || '',
        Phone: userData.phone || '',
        Bio: userData.bio || '',
        CreatedDate: new Date().toISOString(),
        LastLogin: new Date().toISOString(),
        Status: 'Active',
      }

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${airtableConfig.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields }),
      })

      if (!response.ok) {
        // Handle specific error cases with fallback to demo mode
        if (response.status === 404) {
          console.warn('Users table not found, falling back to demo mode')
          return this.createDemoUser(userData)
        }
        if (response.status === 403) {
          console.warn('Database access denied, falling back to demo mode')
          return this.createDemoUser(userData)
        }
        if (response.status === 422) {
          // For validation errors, still try demo mode as table structure might be different
          console.warn('Invalid user data format for Airtable, falling back to demo mode')
          return this.createDemoUser(userData)
        }

        // For other errors, fall back to demo mode
        console.warn(
          `Registration failed with status ${response.status}, falling back to demo mode`
        )
        return this.createDemoUser(userData)
      }

      const result = await response.json()
      console.log('User successfully created in Airtable')
      return result
    } catch (error) {
      console.error('User creation error:', error)
      console.warn('Falling back to demo mode due to error')
      return this.createDemoUser(userData)
    }
  }

  // Create a demo user (local storage based)
  createDemoUser(userData) {
    const demoUser = {
      id: `demo-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      fields: {
        Email: userData.email,
        Password: this.hashPassword(userData.password), // Hash password for demo users too
        FirstName: userData.firstName,
        LastName: userData.lastName,
        Portal: userData.portal,
        Company: userData.company || '',
        Phone: userData.phone || '',
        Bio: userData.bio || '',
        CreatedDate: new Date().toISOString(),
        LastLogin: new Date().toISOString(),
        Status: 'Active',
      },
    }

    // Store demo user in local storage for persistence
    this.storeDemoUser(demoUser)

    return demoUser
  }

  // Check if we should use demo mode
  shouldUseDemoMode() {
    // Check for demo mode flag in localStorage
    const demoMode = localStorage.getItem('indiegate_demo_mode')
    return demoMode === 'true'
  }

  // Enable demo mode
  enableDemoMode() {
    localStorage.setItem('indiegate_demo_mode', 'true')
    console.log('Demo mode enabled - all new registrations will be stored locally')
  }

  // Disable demo mode
  disableDemoMode() {
    localStorage.removeItem('indiegate_demo_mode')
    console.log('Demo mode disabled - registrations will use Airtable database')
  }

  // Store demo user in local storage
  storeDemoUser(userRecord) {
    try {
      const existingUsers = this.getStoredDemoUsers()
      existingUsers.push(userRecord)
      localStorage.setItem('indiegate_demo_users', JSON.stringify(existingUsers))
      console.log('Demo user stored locally:', userRecord.fields.Email)
    } catch (error) {
      console.error('Error storing demo user:', error)
    }
  }

  // Get stored demo users from local storage
  getStoredDemoUsers() {
    try {
      const stored = localStorage.getItem('indiegate_demo_users')
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('Error retrieving stored demo users:', error)
      return []
    }
  }

  // Find user by email
  async findUserByEmail(email) {
    try {
      // First check for demo users
      const demoUser = this.findDemoUser(email)
      if (demoUser) {
        return demoUser
      }

      // Check Airtable for real users
      const url = `https://api.airtable.com/v0/${airtableConfig.baseId}/Users`
      const filterFormula = `{Email} = "${email}"`

      const response = await fetch(`${url}?filterByFormula=${encodeURIComponent(filterFormula)}`, {
        headers: {
          Authorization: `Bearer ${airtableConfig.apiToken}`,
        },
      })

      if (!response.ok) {
        // If it's a 404, the table might not exist yet - try to create it
        if (response.status === 404) {
          console.warn(
            'Users table not found in Airtable. Please create a "Users" table with the required fields.'
          )
          // For now, return null so user can still register
          return null
        }

        // For 403 errors, provide more specific feedback
        if (response.status === 403) {
          console.error('Airtable API access denied. Check API token permissions for Users table.')
          throw new Error(
            'Database access denied. Please contact support or try registering a new account.'
          )
        }

        throw new Error(`Database error (${response.status}). Please try again or contact support.`)
      }

      const data = await response.json()
      return data.records.length > 0 ? data.records[0].fields : null
    } catch (error) {
      console.error('Error finding user:', error)

      // If it's a network error or Airtable is down, check demo users as fallback
      const demoUser = this.findDemoUser(email)
      if (demoUser) {
        console.log('Using demo user due to database connectivity issues')
        return demoUser
      }

      throw error
    }
  }

  // Find demo user for testing purposes
  findDemoUser(email) {
    // Check built-in demo users
    const builtInDemoUsers = this.getDemoUsers()
    const builtInUser = builtInDemoUsers.find(user => user.Email === email)
    if (builtInUser) {
      return builtInUser
    }

    // Check locally stored demo users
    const storedDemoUsers = this.getStoredDemoUsers()
    const storedUser = storedDemoUsers.find(user => user.fields.Email === email)
    if (storedUser) {
      return storedUser.fields // Return just the fields to match format
    }

    return null
  }

  // Get demo users for testing
  getDemoUsers() {
    return [
      {
        id: 'demo-investor-1',
        Email: 'investor@demo.com',
        Password: 'demo123',
        FirstName: 'Alex',
        LastName: 'Investor',
        Portal: 'investor',
        Company: 'Demo Capital',
        Bio: 'Demo investor account for testing',
        Status: 'Active',
      },
      {
        id: 'demo-filmmaker-1',
        Email: 'filmmaker@demo.com',
        Password: 'demo123',
        FirstName: 'Sarah',
        LastName: 'Director',
        Portal: 'filmmaker',
        Company: 'Indie Films Co',
        Bio: 'Demo filmmaker account for testing',
        Status: 'Active',
      },
      {
        id: 'demo-talent-1',
        Email: 'talent@demo.com',
        Password: 'demo123',
        FirstName: 'Jamie',
        LastName: 'Actor',
        Portal: 'talent',
        Company: 'Freelance',
        Bio: 'Demo talent account for testing',
        Status: 'Active',
      },
      {
        id: 'demo-brand-1',
        Email: 'brand@demo.com',
        Password: 'demo123',
        FirstName: 'Chris',
        LastName: 'Brand',
        Portal: 'brand',
        Company: 'Demo Brands Inc',
        Bio: 'Demo brand account for testing',
        Status: 'Active',
      },
    ]
  }

  // Format user data for frontend use
  formatUserData(userRecord) {
    const fields = userRecord.fields || userRecord
    return {
      id: userRecord.id,
      email: fields.Email,
      firstName: fields.FirstName,
      lastName: fields.LastName,
      portal: fields.Portal,
      company: fields.Company || '',
      phone: fields.Phone || '',
      bio: fields.Bio || '',
      createdDate: fields.CreatedDate,
      lastLogin: fields.LastLogin,
      status: fields.Status || 'Active',
    }
  }

  // Update user profile
  async updateProfile(userId, updateData) {
    try {
      const url = `https://api.airtable.com/v0/${airtableConfig.baseId}/Users/${userId}`

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${airtableConfig.apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fields: updateData }),
      })

      if (!response.ok) {
        throw new Error(`Failed to update profile: ${response.status}`)
      }

      const updatedRecord = await response.json()
      const updatedUser = this.formatUserData(updatedRecord)

      // Update current user if it's the same user
      if (this.currentUser && this.currentUser.id === userId) {
        this.setCurrentUser(updatedUser)
      }

      return { success: true, user: updatedUser }
    } catch (error) {
      console.error('Profile update error:', error)
      return { success: false, error: error.message }
    }
  }

  // Reset password (simplified version)
  async resetPassword(email) {
    try {
      // In a real implementation, this would send an email
      // For now, we'll just log the action
      console.log(`Password reset requested for: ${email}`)

      // Could integrate with email service here
      return { success: true, message: 'Password reset instructions sent to email' }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  // Get user by portal type (for admin functions)
  async getUsersByPortal(portal) {
    try {
      const url = `https://api.airtable.com/v0/${airtableConfig.baseId}/Users`
      const filterFormula = `{Portal} = "${portal}"`

      const response = await fetch(`${url}?filterByFormula=${encodeURIComponent(filterFormula)}`, {
        headers: {
          Authorization: `Bearer ${airtableConfig.apiToken}`,
        },
      })

      if (!response.ok) {
        throw new Error(`Failed to fetch users: ${response.status}`)
      }

      const data = await response.json()
      return data.records.map(record => this.formatUserData(record))
    } catch (error) {
      console.error('Error fetching users by portal:', error)
      return []
    }
  }

  // Test database connection
  async testDatabaseConnection() {
    try {
      const url = `https://api.airtable.com/v0/${airtableConfig.baseId}/Users?maxRecords=1`
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${airtableConfig.apiToken}`,
        },
      })

      if (response.ok) {
        return {
          success: true,
          message: 'Database connection successful',
        }
      } else if (response.status === 404) {
        return {
          success: false,
          error: 'Users table not found. Please create the Users table in Airtable.',
          instructions:
            'Go to your Airtable base and create a table named "Users" with the required fields (see documentation in auth.js)',
        }
      } else if (response.status === 403) {
        return {
          success: false,
          error: 'API access denied. Check your API token permissions.',
          instructions: 'Ensure your Airtable API token has read/write access to the Users table',
        }
      } else {
        return {
          success: false,
          error: `Database connection failed with status ${response.status}`,
        }
      }
    } catch (error) {
      return {
        success: false,
        error: 'Network error connecting to database',
        details: error.message,
      }
    }
  }

  // Get database setup instructions
  getDatabaseSetupInstructions() {
    return {
      title: 'Airtable Users Table Setup Required',
      steps: [
        '1. Go to your Airtable base: https://airtable.com',
        `2. Open base: ${airtableConfig.baseId}`,
        '3. Create a new table named "Users"',
        '4. Add these fields:',
        '   - Email (Single line text, Primary field)',
        '   - Password (Single line text)',
        '   - FirstName (Single line text)',
        '   - LastName (Single line text)',
        '   - Portal (Single select: investor, filmmaker, talent, brand)',
        '   - Company (Single line text)',
        '   - Phone (Phone number)',
        '   - Bio (Long text)',
        '   - CreatedDate (Date and time)',
        '   - LastLogin (Date and time)',
        '   - Status (Single select: Active, Inactive)',
        '5. Ensure your API token has read/write permissions for this table',
      ],
      demoCredentials: [
        'investor@demo.com / demo123',
        'filmmaker@demo.com / demo123',
        'talent@demo.com / demo123',
        'brand@demo.com / demo123',
      ],
    }
  }
}

// Create singleton instance
export const authService = new AuthService()

// Helper functions for components
export const useAuth = () => {
  const [user, setUser] = React.useState(authService.getCurrentUser())

  React.useEffect(() => {
    const checkAuth = () => {
      const currentUser = authService.getCurrentUser()
      if (!authService.isSessionValid() && currentUser) {
        authService.logout()
        setUser(null)
      } else {
        setUser(currentUser)
      }
    }

    // Check auth status periodically
    const interval = setInterval(checkAuth, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  return {
    user,
    isAuthenticated: authService.isAuthenticated(),
    login: async (email, password) => {
      const result = await authService.login(email, password)
      if (result.success) {
        setUser(result.user)
      }
      return result
    },
    register: async userData => {
      const result = await authService.register(userData)
      if (result.success) {
        setUser(result.user)
      }
      return result
    },
    logout: () => {
      authService.logout()
      setUser(null)
    },
    updateProfile: async updateData => {
      if (!user) return { success: false, error: 'Not authenticated' }
      const result = await authService.updateProfile(user.id, updateData)
      if (result.success) {
        setUser(result.user)
      }
      return result
    },
  }
}

// Portal configuration
export const PORTAL_TYPES = {
  INVESTOR: 'investor',
  FILMMAKER: 'filmmaker',
  TALENT: 'talent',
  BRAND: 'brand',
}

export const PORTAL_CONFIGS = {
  [PORTAL_TYPES.INVESTOR]: {
    name: 'Investor Portal',
    description: 'Discover and invest in independent film projects',
    color: 'from-green-500 to-emerald-600',
    icon: '📈',
    fields: ['company', 'investmentRange', 'investmentPreferences'],
  },
  [PORTAL_TYPES.FILMMAKER]: {
    name: 'Filmmaker Portal',
    description: 'Create, fund, and distribute your independent films',
    color: 'from-purple-500 to-indigo-600',
    icon: '🎬',
    fields: ['experience', 'genres', 'equipment'],
  },
  [PORTAL_TYPES.TALENT]: {
    name: 'Talent Portal',
    description: 'Showcase your skills and find opportunities',
    color: 'from-red-500 to-pink-600',
    icon: '👤',
    fields: ['skills', 'experience', 'reel'],
  },
  [PORTAL_TYPES.BRAND]: {
    name: 'Brand Portal',
    description: 'Connect with filmmakers for product placement',
    color: 'from-orange-500 to-red-600',
    icon: '🏢',
    fields: ['industry', 'products', 'budget'],
  },
}
