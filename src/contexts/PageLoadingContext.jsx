import { createContext, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const PageLoadingContext = createContext()

export const PageLoadingProvider = ({ children }) => {
  const [isPageLoading, setIsPageLoading] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Don't show loader for 404 page
    if (location.pathname === '*' || location.pathname.includes('404')) {
      return
    }

    // Start page loading
    setIsPageLoading(true)

    // Professional loading time (1 second)
    const timer = setTimeout(() => {
      setIsPageLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [location.pathname])

  return (
    <PageLoadingContext.Provider value={{ isPageLoading, setIsPageLoading }}>
      {children}
    </PageLoadingContext.Provider>
  )
}

export default PageLoadingContext