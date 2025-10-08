import { useApps } from '../hooks/useApps'
import AppItem from './AppItem'

function TrendingApps() {
  const { featuredApps, loading, error, formatDownloadCount } = useApps()

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

  if (error) {
    return (
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="text-center">
            <div className="text-lg text-red-600">Error loading apps: {error}</div>
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