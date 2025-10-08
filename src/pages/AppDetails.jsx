import { useParams, useNavigate } from 'react-router-dom'
import { useApps } from '../hooks/useApps'
import { useState, useEffect } from 'react'
import GlobalLoader from '../components/GlobalLoader'
import { FaGooglePlay, FaApple, FaArrowLeft, FaDownload, FaStar, FaUsers } from 'react-icons/fa'

function AppDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { getAppById, formatDownloadCount, loading: dataLoading } = useApps()
  const [showSkeleton, setShowSkeleton] = useState(true)
  const [app, setApp] = useState(null)

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
      setApp(foundApp)
    }
  }, [id, getAppById, dataLoading])

  const shouldShowSkeleton = showSkeleton || dataLoading

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
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 flex items-center gap-2 text-[#7C3AED] hover:text-[#6D28D9] transition-colors duration-300"
        >
          <FaArrowLeft />
          <span>Back</span>
        </button>

        {/* App Header */}
        <div className="mb-8 bg-white rounded-xl p-8 shadow-sm">
          <div className="flex flex-col md:flex-row gap-6">
            {/* App Icon */}
            <div className="flex-shrink-0">
              <div className="h-32 w-32 rounded-2xl bg-gray-200 overflow-hidden shadow-lg">
                {app.image ? (
                  <img 
                    src={app.image} 
                    alt={app.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full bg-gray-200"></div>
                )}
              </div>
            </div>

            {/* App Info */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{app.title}</h1>
              <p className="text-lg text-gray-600 mb-4">{app.companyName}</p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <FaDownload className="text-green-600" />
                  <span className="font-semibold">{formatDownloadCount(app.downloads)}</span>
                  <span className="text-gray-500">downloads</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaStar className="text-orange-400" />
                  <span className="font-semibold">{app.ratingAvg}</span>
                  <span className="text-gray-500">({totalRatings.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaUsers className="text-blue-500" />
                  <span className="font-semibold">{app.size}MB</span>
                  <span className="text-gray-500">size</span>
                </div>
              </div>

              {/* Download Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex items-center justify-center gap-3 bg-[#7C3AED] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#6D28D9] transition-colors duration-300">
                  <FaGooglePlay />
                  Get on Google Play
                </button>
                <button className="flex items-center justify-center gap-3 bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition-colors duration-300">
                  <FaApple />
                  Download on App Store
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8 bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">About this app</h2>
          <p className="text-gray-700 leading-relaxed">{app.description}</p>
        </div>

        {/* Ratings Breakdown */}
        <div className="bg-white rounded-xl p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Ratings & Reviews</h2>
          
          <div className="flex items-center gap-6 mb-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-gray-900">{app.ratingAvg}</div>
              <div className="flex justify-center mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <FaStar 
                    key={star} 
                    className={star <= Math.floor(app.ratingAvg) ? 'text-orange-400' : 'text-gray-300'} 
                  />
                ))}
              </div>
              <div className="text-gray-500">{totalRatings.toLocaleString()} reviews</div>
            </div>
          </div>

          {/* Rating Bars */}
          <div className="space-y-3">
            {app.ratings.reverse().map((rating, index) => {
              const percentage = (rating.count / totalRatings) * 100
              return (
                <div key={rating.name} className="flex items-center gap-4">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm">{5 - index}</span>
                    <FaStar className="text-xs text-orange-400" />
                  </div>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-orange-400 h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-gray-500 w-16 text-right">
                    {rating.count.toLocaleString()}
                  </div>
                </div>
              )
            })}
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