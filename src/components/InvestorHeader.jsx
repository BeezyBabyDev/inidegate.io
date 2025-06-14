import React, { useState } from 'react'

const InvestorHeader = ({ onBack, onLogout }) => {
  const [profileOpen, setProfileOpen] = useState(false)
  const [projectsOpen, setProjectsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-900 via-purple-900 to-indigo-900 bg-opacity-90 backdrop-blur-lg px-6 py-4 shadow-lg">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left: Logo & Network */}
        <div className="flex flex-col justify-center">
          <h1 className="text-2xl md:text-3xl font-bold leading-tight text-white flex items-end">
            <span>IndieGate.</span>
            <span className="text-blue-400 ml-1">io</span>
          </h1>
          <p className="text-base md:text-lg text-blue-200 leading-tight mt-1">Investor Network</p>
        </div>

        {/* Center: Icons/Dropdowns/Search */}
        <div className="flex-1 flex justify-center items-center space-x-6">
          {/* Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(v => !v)}
              className="flex items-center space-x-2 text-white hover:text-blue-300 focus:outline-none"
            >
              {/* User Icon */}
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="hidden md:inline">Me</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {profileOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white rounded-lg shadow-lg py-2 z-50">
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100">Profile Settings</button>
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100">Account</button>
              </div>
            )}
          </div>

          {/* Projects Dropdown */}
          <div className="relative">
            <button
              onClick={() => setProjectsOpen(v => !v)}
              className="flex items-center space-x-2 text-white hover:text-blue-300 focus:outline-none"
            >
              {/* Projects Icon */}
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2a2 2 0 012-2h2a2 2 0 012 2v2m-6 4h6a2 2 0 002-2v-5a2 2 0 00-2-2H7a2 2 0 00-2 2v5a2 2 0 002 2z" />
              </svg>
              <span className="hidden md:inline">Projects</span>
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            {projectsOpen && (
              <div className="absolute left-0 mt-2 w-44 bg-white rounded-lg shadow-lg py-2 z-50">
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100">Project 1</button>
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100">Project 2</button>
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100">New Project</button>
              </div>
            )}
          </div>

          {/* My Network */}
          <button className="flex items-center space-x-2 text-white hover:text-blue-300 focus:outline-none">
            {/* Network Icon */}
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="hidden md:inline">My Network</span>
          </button>

          {/* Messaging Icon */}
          <button className="flex items-center space-x-2 text-white hover:text-blue-300 focus:outline-none">
            {/* Message Icon */}
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8l-4.28 1.07A1 1 0 013 19.13V17.4a9.77 9.77 0 01-2-5.4C1 7.582 5.03 4 10 4s9 3.582 9 8z" />
            </svg>
            <span className="hidden md:inline">Messages</span>
          </button>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="rounded-lg px-3 py-2 w-40 md:w-56 bg-white/90 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <svg className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="11" cy="11" r="8" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
            </svg>
          </div>
        </div>

        {/* Right: Back to Home & Logout */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="px-6 py-2 rounded-lg border border-white/40 text-white bg-white/10 hover:bg-white/20 font-semibold text-base transition-colors"
          >
            Back to Home
          </button>
          <button
            onClick={onLogout}
            className="px-6 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white font-semibold text-base transition-colors shadow"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default InvestorHeader 