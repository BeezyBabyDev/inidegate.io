import Button from './Button'
import { useScrollToTop } from '../hooks/useScrollToTop'

const PortalSelectionPage = ({ onSelectPortal }) => {
  // Automatically scroll to top when component mounts
  useScrollToTop()

  // Category data for each portal
  const filmmakersCategories = [
    'Directors & Producers',
    'Cinematographers',
    'Production Crew',
    'Post Production Artists',
    'Sound Engineers',
    'Art Directors',
  ]

  const investorCategories = [
    'Angel Investors',
    'VC Partners',
    'HNWIs',
    'Strategic Partners',
    'Film Funds',
    'Media Companies',
  ]

  const talentCategories = [
    'Lead & Supporting Actors',
    'Voice Artists',
    'Background Performers',
    'Models & Influencers',
    'Stunt Performers',
    'Child Actors',
  ]

  const brandCategories = [
    'Fashion & Lifestyle',
    'Technology & Apps',
    'Food & Beverage',
    'Automotive',
    'Luxury Goods',
    'Local Businesses',
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900">
      {/* Hero Section */}
      <main className="px-6 py-16">
        <div className="max-w-7xl mx-auto text-center text-white">
          {/* Hero Content */}
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Choose Your <span className="text-blue-400">Portal</span>
            </h2>
            <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Access your dedicated network and connect with the right opportunities for your film
              industry goals.
            </p>
          </div>

          {/* Portal Selection - 4 Portals in 2x2 Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Investor Portal */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold mb-4">Investor Network</h3>
              <p className="text-blue-100 mb-6">
                Discover groundbreaking indie film projects, analyze market opportunities, and build
                your entertainment portfolio with confidence.
              </p>

              {/* Investor Categories */}
              <div className="text-left mb-6">
                <p className="text-sm font-medium text-blue-200 mb-3">Network Includes:</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {investorCategories.slice(0, 4).map((category, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-green-500/20 text-green-200 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                  <span className="px-2 py-1 bg-green-500/30 text-green-100 text-xs rounded-full font-medium">
                    +{investorCategories.length - 4} more
                  </span>
                </div>
              </div>

              <ul className="text-left text-blue-100 mb-8 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Film Project Deal Flow
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  AI-Powered ROI Predictions
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                  Industry Network Access
                </li>
              </ul>
              <Button
                onClick={() => onSelectPortal('investor')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 mt-2"
              >
                Enter Investor Portal
              </Button>
            </div>

            {/* Filmmakers Portal */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Filmmakers Portal</h3>
              <p className="text-white/80 mb-6">
                Behind-the-camera professionals creating cinematic magic. Connect with projects,
                showcase your work, and build your film career.
              </p>

              {/* Filmmakers Categories */}
              <div className="text-left mb-6">
                <p className="text-sm font-medium text-blue-200 mb-3">Network Includes:</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {filmmakersCategories.slice(0, 4).map((category, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-purple-500/20 text-purple-200 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                  <span className="px-2 py-1 bg-purple-500/30 text-purple-100 text-xs rounded-full font-medium">
                    +{filmmakersCategories.length - 4} more
                  </span>
                </div>
              </div>

              <ul className="text-left text-white/70 mb-8 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Build professional profiles
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  AI-Powered Project Matching
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                  Connect with opportunities
                </li>
              </ul>
              <Button
                onClick={() => onSelectPortal('filmmaker')}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 mt-2"
              >
                Enter Filmmaker Portal
              </Button>
            </div>

            {/* Talent Portal */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Talent Portal</h3>
              <p className="text-white/80 mb-6">
                On-camera performers bringing stories to life. Showcase your talent, audition for
                roles, and connect with casting directors.
              </p>

              {/* Talent Categories */}
              <div className="text-left mb-6">
                <p className="text-sm font-medium text-blue-200 mb-3">Network Includes:</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {talentCategories.slice(0, 4).map((category, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-pink-500/20 text-pink-200 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                  <span className="px-2 py-1 bg-pink-500/30 text-pink-100 text-xs rounded-full font-medium">
                    +{talentCategories.length - 4} more
                  </span>
                </div>
              </div>

              <ul className="text-left text-white/70 mb-8 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                  Create casting profiles
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                  Connect with casting directors
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                  AI-Powered Role Matching
                </li>
              </ul>
              <Button
                onClick={() => onSelectPortal('talent')}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white py-3 mt-2"
              >
                Enter Talent Portal
              </Button>
            </div>

            {/* Brands Portal */}
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 transform hover:scale-105 group">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-amber-600 rounded-xl flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Brands Portal</h3>
              <p className="text-white/80 mb-6">
                Companies seeking authentic product placement opportunities and equity partnerships
                in film projects for maximum impact.
              </p>

              {/* Brand Categories */}
              <div className="text-left mb-6">
                <p className="text-sm font-medium text-blue-200 mb-3">Network Includes:</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {brandCategories.slice(0, 4).map((category, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-orange-500/20 text-orange-200 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                  <span className="px-2 py-1 bg-orange-500/30 text-orange-100 text-xs rounded-full font-medium">
                    +{brandCategories.length - 4} more
                  </span>
                </div>
              </div>

              <ul className="text-left text-white/70 mb-8 space-y-2">
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  Product placement opportunities
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  Equity partnership deals
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                  AI-Powered Brand Matching
                </li>
              </ul>
              <Button
                onClick={() => onSelectPortal('brand')}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 mt-2"
              >
                Enter Brands Portal
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">AI-Powered Matching</h4>
              <p className="text-blue-100 text-sm">
                Smart algorithms connecting the right people with perfect projects
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Industry Secure</h4>
              <p className="text-blue-100 text-sm">
                Bank-level security protecting your creative projects and investments
              </p>
            </div>

            <div>
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                  />
                </svg>
              </div>
              <h4 className="text-lg font-semibold mb-2">Global Network</h4>
              <p className="text-blue-100 text-sm">
                Connect with entertainment industry professionals worldwide
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default PortalSelectionPage
