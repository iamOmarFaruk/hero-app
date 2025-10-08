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

  // Prepare chart data for Recharts
  const chartData = app.ratings.map((rating, index) => ({
    star: `${5 - index} star`,
    count: rating.count,
    percentage: Math.round((rating.count / totalRatings) * 100)
  })).reverse()

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
                {isInstalled ? '✓ Installed' : `Install Now`}
              </button>
              
              {/* App Size Info */}
              <div className="text-center mt-2 text-sm text-gray-500">
                {app.size} MB • Free
                {!isInstalled && (
                  <div className="text-xs text-green-600 mt-1">
                    Fast download • No ads
                  </div>
                )}
              </div>
            </div>

            {/* Right: App Info & Stats */}
            <div className="flex-1">
              {/* App Title & Developer */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{app.title}</h1>
              <p className="text-lg text-blue-600 mb-6">Developed by {app.companyName.toLowerCase()}</p>

              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-8 mb-6">
                {/* Downloads */}
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <FaDownload className="text-green-500 text-xl" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{formatDownloadCount(app.downloads)}</div>
                  <div className="text-sm text-gray-500">Downloads</div>
                </div>

                {/* Rating */}
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <FaStar className="text-orange-400 text-xl" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{app.ratingAvg}</div>
                  <div className="text-sm text-gray-500">Star Ratings</div>
                </div>

                {/* Reviews */}
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <FaUsers className="text-blue-500 text-xl" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{(totalRatings/1000).toFixed(0)}K</div>
                  <div className="text-sm text-gray-500">User Reviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* Ratings Section */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-6">User Ratings & Feedback</h2>
            
            {/* Rating Summary */}
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-gray-900">{app.ratingAvg}</div>
                  <div className="text-sm text-gray-600">out of 5 stars</div>
                  <div className="text-sm text-gray-500">{totalRatings.toLocaleString()} total ratings</div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">Quality Rating</div>
                  <div className="text-lg font-semibold text-purple-600">
                    {app.ratingAvg >= 4.5 ? "Excellent" : 
                     app.ratingAvg >= 4.0 ? "Very Good" :
                     app.ratingAvg >= 3.5 ? "Good" : "Fair"}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Rating Chart */}
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} layout="horizontal">
                  <XAxis type="number" domain={[0, 'dataMax']} />
                  <YAxis type="category" dataKey="star" width={60} />
                  <Bar dataKey="count" fill="#8B5CF6" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Dynamic Rating Numbers */}
            <div className="flex justify-between text-sm text-gray-500 px-2">
              <span>0</span>
              <span>{Math.round(Math.max(...chartData.map(d => d.count)) * 0.25).toLocaleString()}</span>
              <span>{Math.round(Math.max(...chartData.map(d => d.count)) * 0.5).toLocaleString()}</span>
              <span>{Math.round(Math.max(...chartData.map(d => d.count)) * 0.75).toLocaleString()}</span>
              <span>{Math.max(...chartData.map(d => d.count)).toLocaleString()}</span>
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
                  `Our users consistently rate ${app.title} as exceptional, with ${Math.round((chartData[4]?.count / totalRatings) * 100)}% giving it 5 stars. `
                ) : app.ratingAvg >= 4.0 ? (
                  `${app.title} maintains high user satisfaction with ${Math.round((chartData[4]?.count / totalRatings) * 100)}% of users rating it 4+ stars. `
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