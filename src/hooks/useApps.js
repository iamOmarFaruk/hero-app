import { useContext } from 'react'
import AppsContext from '../contexts/AppsContext'

// Custom hook to use the Apps context
export const useApps = () => {
  const context = useContext(AppsContext)
  
  if (!context) {
    throw new Error('useApps must be used within an AppsProvider')
  }
  
  return context
}