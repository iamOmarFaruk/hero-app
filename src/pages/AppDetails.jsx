import { useParams, useNavigate } from 'react-router-dom'
import { useApps } from '../hooks/useApps'
import { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from 'recharts'
import toast, { Toaster } from 'react-hot-toast'
import GlobalLoader from '../components/GlobalLoader'
import { FaDownload, FaStar, FaUsers, FaArrowLeft } from 'react-icons/fa'

function AppDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getAppById, formatDownloadCount, loading: dataLoading } = useApps()
  const [showSkeleton, setShowSkeleton] = useState(true)
  const [app, setApp] = useState(null)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Show skeleton loading for professional feel
    const timer = setTimeout(() => {
      setShowSkeleton(false)
    }, 1200)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!dataLoading) {
      const foundApp = getAppById(parseInt(id))
      console.log('Found app:', foundApp) // Debug log
      setApp(foundApp)
      
      // Check if app is already installed
      if (foundApp) {
        const installedApps = JSON.parse(localStorage.getItem('installedApps') || '[]')
        setIsInstalled(installedApps.includes(foundApp.id))
      }
    }
  }, [id, getAppById, dataLoading])

  const shouldShowSkeleton = showSkeleton || dataLoading

  const handleInstall = () => {
    if (!app || isInstalled) return

    // Add to localStorage
    const installedApps = JSON.parse(localStorage.getItem('installedApps') || '[]')
    installedApps.push(app.id)
    localStorage.setItem('installedApps', JSON.stringify(installedApps))
    
    // Update state
    setIsInstalled(true)
    
    // Show success toast
    toast.success(`${app.title} installed successfully!`, {
      duration: 3000,
      position: 'top-center',
      style: {
        background: '#10B981',
        color: 'white',
        fontWeight: '500',
      },
    })
  }

  // Show loader during initial data loading or skeleton time
  if (shouldShowSkeleton) {
    return <GlobalLoader message="Loading app details..." />
  }

  // If app not found, redirect to app not found page
  if (!app) {
    return <AppNotFound />
  }

  const totalRatings = app.ratings.reduce((sum, rating) => sum + rating.count, 0)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <Toaster />
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-[#7C3AED] hover:text-[#6D28D9] transition-colors duration-300"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        {/* Main App Details Card */}
        <div className="bg-white rounded-xl p-8 shadow-sm">
          {/* App Header Section */}
          <div className="flex flex-col lg:flex-row gap-8 mb-8">
            {/* Left: App Icon & Install Button */}
            <div className="flex flex-col items-center lg:items-start">
              {/* App Icon */}
              <div className="h-32 w-32 rounded-2xl bg-gray-200 overflow-hidden shadow-lg mb-6">
                {app.image ? (
                  <img 
                    src={app.image} 
                    alt={app.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200 flex items-center justify-center text-gray-400">
                    📱
                  </div>
                )}
              </div>

              {/* Install Button */}
              <button
                onClick={handleInstall}
                disabled={isInstalled}
                className={`w-full max-w-xs px-6 py-3 rounded-lg font-semibold text-white transition-all duration-300 ${
                  isInstalled 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600 hover:shadow-lg'
                }`}
              >
                {isInstalled ? '✓ Installed' : `Install Now (${app.size} MB)`}
              </button>
            </div>

            {/* Right: App Info & Stats */}
            <div className="flex-1">
              {/* App Title & Developer */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{app.title}</h1>
              <p className="text-sm text-gray-600 mb-6">Developed by <span className="text-blue-600">{app.companyName.toLowerCase()}</span></p>

              {/* Stats Row */}
              <div className="flex flex-row gap-8 mb-6">
                {/* Downloads */}
                <div className="flex flex-col items-center">
                  <div className="text-green-500 mb-1">
                    <FaDownload className="text-xl" />
                  </div>
                  <div className="text-xl font-bold">{formatDownloadCount(app.downloads)}</div>
                  <div className="text-xs text-gray-500">Downloads</div>
                </div>

                {/* Rating */}
                <div className="flex flex-col items-center">
                  <div className="text-orange-400 mb-1">
                    <FaStar className="text-xl" />
                  </div>
                  <div className="text-xl font-bold">{app.ratingAvg}</div>
                  <div className="text-xs text-gray-500">Average Rating</div>
                </div>

                {/* Reviews */}
                <div className="flex flex-col items-center">
                  <div className="text-purple-500 mb-1">
                    <FaUsers className="text-xl" />
                  </div>
                  <div className="text-xl font-bold">{(totalRatings/1000).toFixed(0)}K</div>
                  <div className="text-xs text-gray-500">Total Reviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* Ratings Section */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Ratings</h3>

            {/* Rating Chart */}
            <div>
              {/* Using custom HTML instead of Recharts to ensure it displays correctly */}
              {app.ratings.slice().reverse().map((rating, index) => (
                <div key={index} className="flex items-center mb-2">
                  <div className="w-12 text-sm text-gray-600">{rating.name}</div>
                  <div className="flex-1 px-2">
                    <div className="relative h-5">
                      <div 
                        className="absolute top-0 left-0 h-5 bg-orange-400 rounded-r" 
                        style={{ 
                          width: `${(rating.count / 12000) * 100}%`,
                          maxWidth: '100%' 
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Chart Scale */}
              <div className="flex justify-between text-xs text-gray-500 mt-4 pl-14">
                <span>0</span>
                <span>3000</span>
                <span>6000</span>
                <span>9000</span>
                <span>12000</span>
              </div>
            </div>
          </div>

          {/* Description Section */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Description</h2>
            <div className="text-gray-700 leading-relaxed space-y-4">
              <p>{app.description}</p>
              
              {/* Additional dynamic content based on app stats */}
              <p>
                With over {formatDownloadCount(app.downloads)} downloads and a {app.ratingAvg}-star rating from {totalRatings.toLocaleString()} users, 
                {app.title} has proven to be a reliable and popular choice among {app.companyName} applications. 
                The app's compact {app.size}MB size makes it accessible for devices with limited storage space.
              </p>

              <p>
                This focus app takes the proven Pomodoro technique and makes it even more practical for modern lifestyles. Instead of just setting a timer, it builds a complete environment for deep work, prioritizing distractions and maximizing user focus. Create custom work and break intervals, track how many sessions they complete each day, and review detailed statistics about their focus habits over time.
              </p>

              {/* Dynamic features based on rating quality */}
              <p>
                {app.ratingAvg >= 4.5 ? (
                  `Our users consistently rate ${app.title} as exceptional, with ${Math.round((app.ratings[4].count / totalRatings) * 100)}% giving it 5 stars. `
                ) : app.ratingAvg >= 4.0 ? (
                  `${app.title} maintains high user satisfaction with ${Math.round((app.ratings[4].count / totalRatings) * 100)}% of users rating it 4+ stars. `
                ) : (
                  `We're continuously improving ${app.title} based on user feedback. `
                )}
                For people who struggle with procrastination, the app provides motivational streaks and achievements. Completing multiple Pomodoro sessions unlocks milestones, which adds a subtle gamification layer to habit-forming.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// App Not Found Component
function AppNotFound() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-6">
        <div className="mb-8">
          <div className="text-8xl mb-4">📱</div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">App Not Found</h1>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, the app you're looking for doesn't exist or may have been removed.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/apps')}
            className="bg-[#7C3AED] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#6D28D9] transition-colors duration-300"
          >
            Browse All Apps
          </button>
          <button
            onClick={() => navigate('/')}
            className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors duration-300"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  )
}

export default AppDetails