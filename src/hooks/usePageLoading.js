import { useContext } from 'react'
import PageLoadingContext from '../contexts/PageLoadingContext'

export const usePageLoading = () => {
  const context = useContext(PageLoadingContext)
  
  if (!context) {
    throw new Error('usePageLoading must be used within a PageLoadingProvider')
  }
  
  return context
}