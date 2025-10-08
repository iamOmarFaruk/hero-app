import { useState, useEffect } from 'react'
import AppItem from './AppItem'

function TrendingApps() {
  const [featuredApps, setFeaturedApps] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAppsData = async () => {
      try {
        const response = await fetch('/apps-data.json')
        const appsData = await response.json()
        
        // Filter only featured apps
        const featured = appsData.filter(app => app.isFeature === true)
        setFeaturedApps(featured)
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
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="text-center">
            <div className="text-lg text-gray-600">Loading trending apps...</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-50 py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">
            Trending Apps
          </h2>
          <p className="text-gray-600">
            Explore All Trending Apps on the Market developed by us
          </p>
        </div>

        {/* Apps Grid */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredApps.map((app) => (
            <AppItem
              key={app.id}
              title={app.title}
              image={app.image}
              downloadCount={formatDownloadCount(app.downloads)}
              rating={app.ratingAvg.toString()}
            />
          ))}
        </div>

        {/* Show All Button */}
        <div className="text-center">
          <a
            href="/apps"
            className="inline-flex items-center rounded-lg bg-[#7C3AED] px-8 py-3 text-base font-semibold text-white transition duration-300 hover:bg-[#6D28D9] hover:shadow-lg"
          >
            Show All
          </a>
        </div>
      </div>
    </section>
  )
}

export default TrendingApps