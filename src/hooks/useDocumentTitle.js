import { useEffect } from 'react'

/**
 * A custom hook to set the document title dynamically
 * @param {string} title - The page-specific title
 * @param {boolean} withAppName - Whether to include the app name in the title
 */
function useDocumentTitle(title, withAppName = true) {
  useEffect(() => {
    const appName = 'HERO.IO'
    const baseTitle = withAppName ? `${title} | ${appName}` : title
    document.title = baseTitle

    return () => {
      // Reset to default when component unmounts if needed
      document.title = 'HERO.IO | Productive Apps for Smarter Living'
    }
  }, [title, withAppName])
}

export default useDocumentTitle