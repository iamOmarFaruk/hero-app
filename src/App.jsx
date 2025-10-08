import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppsProvider } from './contexts/AppsContext'
import { PageLoadingProvider } from './contexts/PageLoadingContext'
import { usePageLoading } from './hooks/usePageLoading'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import GlobalLoader from './components/GlobalLoader'
import Home from './pages/Home'
import Apps from './pages/Apps'
import AppDetails from './pages/AppDetails'
import Installation from './pages/Installation'
import NotFound from './pages/NotFound'

function AppContent() {
  const { isPageLoading } = usePageLoading()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Page Loading Overlay */}
      {isPageLoading && <GlobalLoader message="Loading page..." />}
      
      {/* Global Navbar */}
      <Navbar />

      {/* Page Content */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apps" element={<Apps />} />
          <Route path="/app/:id" element={<AppDetails />} />
          <Route path="/installation" element={<Installation />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  )
}

function App() {
  return (
    <AppsProvider>
      <Router>
        <PageLoadingProvider>
          <AppContent />
        </PageLoadingProvider>
      </Router>
    </AppsProvider>
  )
}

export default App
