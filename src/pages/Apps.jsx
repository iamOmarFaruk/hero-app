import { useState, useEffect } from 'react'
import AppItem from '../components/AppItem'

function Apps() {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const fetchAppsData = async () => {
      try {
        const response = await fetch('/apps-data.json')
        const appsData = await response.json()
        setApps(appsData)
      } catch (error) {
        console.error('Error fetching apps data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppsData()
  }, [])

  // Format download count for display
  const formatDownloadCount = (downloads) => {
    if (downloads >= 1000000) {
      return Math.floor(downloads / 100000) / 10 + 'M'
    }
    if (downloads >= 1000) {
      return Math.floor(downloads / 100) / 10 + 'K'
    }
    return downloads.toString()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="text-center">
            <div className="text-lg text-gray-600">Loading applications...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Page Header */}
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Our All Applications
          </h1>
          <p className="text-gray-600">
            Explore All Apps on the Market developed by us. We code for Millions
          </p>
        </div>

        {/* Search Bar and Count */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          {/* Apps Count */}
          <div className="text-lg font-medium text-gray-900">
            ({apps.length}) Apps Found
          </div>

          {/* Search Input */}
          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search Apps..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 pl-10 text-gray-900 placeholder-gray-500 focus:border-[#7C3AED] focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
            />
            <div className="absolute left-3 top-1/2 -translate-y-1/2">
              <svg 
                className="h-4 w-4 text-gray-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {apps.map((app) => (
            <AppItem
              key={app.id}
              title={app.title}
              image={app.image}
              downloadCount={formatDownloadCount(app.downloads)}
              rating={app.ratingAvg.toString()}
            />
          ))}
        </div>

        {/* No Results Message */}
        {apps.length === 0 && !loading && (
          <div className="py-12 text-center">
            <p className="text-lg text-gray-600">No applications found.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Apps