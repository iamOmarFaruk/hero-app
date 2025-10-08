import { createContext, useEffect, useState } from 'react'

// Create the context
const AppsContext = createContext(undefined)

// Apps Provider component
export const AppsProvider = ({ children }) => {
  const [apps, setApps] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch apps data on mount
  useEffect(() => {
    const fetchAppsData = async () => {
      const startTime = Date.now()
      const minimumLoadingTime = 1500 // 1.5 seconds minimum
      
      try {
        setLoading(true)
        setError(null)
        
        const response = await fetch('/apps-data.json')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch apps data: ${response.status}`)
        }
        
        const appsData = await response.json()
        
        // Validate data structure
        if (!Array.isArray(appsData)) {
          throw new Error('Invalid apps data format')
        }
        
        setApps(appsData)
      } catch (err) {
        console.error('Error fetching apps data:', err)
        setError(err.message)
      } finally {
        // Calculate remaining time to meet minimum loading duration
        const elapsedTime = Date.now() - startTime
        const remainingTime = Math.max(0, minimumLoadingTime - elapsedTime)
        
        // Wait for remaining time if needed, then set loading to false
        setTimeout(() => {
          setLoading(false)
        }, remainingTime)
      }
    }

    fetchAppsData()
  }, [])

  // Computed values
  const featuredApps = apps.filter(app => app.isFeature === true)
  const totalApps = apps.length
  const totalFeaturedApps = featuredApps.length

  // Utility functions
  const formatDownloadCount = (downloads) => {
    if (downloads >= 1000000) {
      return Math.floor(downloads / 100000) / 10 + 'M'
    }
    if (downloads >= 1000) {
      return Math.floor(downloads / 100) / 10 + 'K'
    }
    return downloads.toString()
  }

  const getAppById = (id) => {
    return apps.find(app => app.id === id)
  }

  // Context value
  const contextValue = {
    // Data
    apps,
    featuredApps,
    totalApps,
    totalFeaturedApps,
    
    // States
    loading,
    error,
    
    // Utility functions
    formatDownloadCount,
    getAppById
  }

  return (
    <AppsContext.Provider value={contextValue}>
      {children}
    </AppsContext.Provider>
  )
}

export default AppsContext