import { useState, useEffect } from 'react'
import { FaStar, FaDownload } from 'react-icons/fa'
import { toast, Toaster } from 'react-hot-toast'

function Installation() {
  const [installedApps, setInstalledApps] = useState([])
  const [sortBy, setSortBy] = useState('name')
  
  useEffect(() => {
    loadInstalledApps()
  }, [])
  
  const loadInstalledApps = () => {
    // Get installed app IDs
    const installedAppIds = JSON.parse(localStorage.getItem('installedApps') || '[]')
    
    // Get detailed app data
    const appsData = JSON.parse(localStorage.getItem('installedAppsData') || '{}')
    
    // Convert to array of apps
    const appsList = installedAppIds
      .filter(id => appsData[id]) // Only include apps that have data
      .map(id => appsData[id])
      
    setInstalledApps(appsList)
  }
  
  const handleUninstall = (app) => {
    // Remove from installedApps array
    const installedAppIds = JSON.parse(localStorage.getItem('installedApps') || '[]')
    const updatedAppIds = installedAppIds.filter(id => id !== app.id)
    localStorage.setItem('installedApps', JSON.stringify(updatedAppIds))
    
    // Remove from installedAppsData object
    const appsData = JSON.parse(localStorage.getItem('installedAppsData') || '{}')
    delete appsData[app.id]
    localStorage.setItem('installedAppsData', JSON.stringify(appsData))
    
    // Update state
    loadInstalledApps()
    
    // Show success toast
    toast.success(`${app.title} uninstalled successfully!`, {
      duration: 3000,
      position: 'top-center',
      style: {
        background: '#10B981',
        color: 'white',
        fontWeight: '500',
      },
    })
  }
  
  const formatDownloadCount = (downloads) => {
    if (downloads >= 1000000) {
      return Math.floor(downloads / 100000) / 10 + 'M'
    }
    if (downloads >= 1000) {
      return Math.floor(downloads / 100) / 10 + 'K'
    }
    return downloads.toString()
  }
  
  const sortedApps = [...installedApps].sort((a, b) => {
    switch(sortBy) {
      case 'name':
        return a.title.localeCompare(b.title)
      case 'size':
        return a.size - b.size
      case 'rating':
        return b.ratingAvg - a.ratingAvg
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <Toaster />
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Your Installed Apps
          </h1>
          <p className="text-gray-600">
            Explore All Trending Apps on the Market developed by us
          </p>
        </div>

        {/* Apps Count and Sort */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Apps Count */}
          <div className="text-lg font-medium text-gray-900">
            {installedApps.length} {installedApps.length === 1 ? 'App' : 'Apps'} Found
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 pr-8 text-gray-900 appearance-none focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
            >
              <option value="name">Sort By Name</option>
              <option value="size">Sort By Size</option>
              <option value="rating">Sort By Rating</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        {installedApps.length > 0 ? (
          <div className="space-y-6">
            {sortedApps.map(app => (
              <div key={app.id} className="bg-white rounded-xl p-4 sm:p-6 shadow-md flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4 sm:gap-0">
                <div className="flex items-center w-full">
                  {/* App Icon */}
                  <div className="h-16 w-16 rounded-xl bg-gray-200 overflow-hidden mr-4 flex-shrink-0">
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
                  
                  {/* App Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-1 break-words pr-2">{app.title}</h3>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
                      <div className="flex items-center text-gray-600">
                        <FaDownload className="text-green-500 mr-1" />
                        <span>{formatDownloadCount(app.downloads)}</span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <FaStar className="text-orange-400 mr-1" />
                        <span>{app.ratingAvg}</span>
                      </div>
                      <div className="text-gray-600 font-medium">
                        {app.size} MB
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Uninstall Button */}
                <button
                  onClick={() => handleUninstall(app)}
                  className="w-full sm:w-auto px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-medium rounded-xl transition-colors duration-200 text-center flex-shrink-0"
                >
                  Uninstall
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-white rounded-xl shadow-md px-6">
            <div className="text-7xl md:text-8xl mb-4">📱</div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">No Apps Installed</h2>
            <p className="text-lg text-gray-600">
              You haven't installed any apps yet. Browse our collection and install some apps.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Installation