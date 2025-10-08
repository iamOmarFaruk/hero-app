import { useState, useEffect, useRef } from 'react'
import { useApps } from '../hooks/useApps'
import AppItem from './AppItem'
import AppItemSkeleton from './AppItemSkeleton'

function TrendingApps() {
  const { featuredApps, loading: dataLoading, error, formatDownloadCount } = useApps()
  const [showSkeleton, setShowSkeleton] = useState(true)
  const [hasBeenViewed, setHasBeenViewed] = useState(false)
  const sectionRef = useRef(null)

  // Intersection Observer to detect when section comes into view
  useEffect(() => {
    const currentRef = sectionRef.current
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasBeenViewed) {
          // User sees the section for the first time, show skeleton
          setHasBeenViewed(true)
          setShowSkeleton(true)
          
          // Show skeleton for 1.5 seconds to simulate fresh data loading
          const timer = setTimeout(() => {
            setShowSkeleton(false)
          }, 1500)

          return () => clearTimeout(timer)
        }
      },
      {
        threshold: 0.1, // Trigger when 10% of section is visible
        rootMargin: '50px' // Start loading a bit before fully visible
      }
    )

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [hasBeenViewed])

  // Reset skeleton state when user navigates back to page
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && hasBeenViewed) {
        // User returned to page, show fresh loading again
        setShowSkeleton(true)
        const timer = setTimeout(() => {
          setShowSkeleton(false)
        }, 1200) // Slightly shorter for return visits

        return () => clearTimeout(timer)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [hasBeenViewed])

  // Show skeleton if either still in skeleton time OR data is loading
  const shouldShowSkeleton = showSkeleton || dataLoading

  if (error) {
    return (
      <section className="bg-gray-50 py-16" ref={sectionRef}>
        <div className="mx-auto max-w-7xl px-6 md:px-10">
          <div className="text-center">
            <div className="text-lg text-red-600">Error loading apps: {error}</div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-gray-50 py-16" ref={sectionRef}>
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

        {/* Apps Grid - Show skeleton or real content */}
        <div className="mb-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {shouldShowSkeleton ? (
            // Show skeleton items with loading indicator
            <>
              {Array.from({ length: 8 }).map((_, index) => (
                <AppItemSkeleton key={`skeleton-${index}`} />
              ))}
            </>
          ) : (
            // Show real apps
            featuredApps.map((app) => (
              <AppItem
                key={app.id}
                title={app.title}
                image={app.image}
                downloadCount={formatDownloadCount(app.downloads)}
                rating={app.ratingAvg.toString()}
              />
            ))
          )}
        </div>

        {/* Show All Button */}
        <div className="text-center">
          {shouldShowSkeleton ? (
            <div className="inline-block h-12 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
          ) : (
            <a
              href="/apps"
              className="inline-flex items-center rounded-lg bg-[#7C3AED] px-8 py-3 text-base font-semibold text-white transition duration-300 hover:bg-[#6D28D9] hover:shadow-lg"
            >
              Show All
            </a>
          )}
        </div>

        {/* Subtle loading indicator when showing skeleton */}
        {shouldShowSkeleton && (
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 animate-pulse">
              Loading latest trending apps...
            </p>
          </div>
        )}
      </div>
    </section>
  )
}

export default TrendingApps