import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AppsProvider } from './contexts/AppsContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Apps from './pages/Apps'
import Installation from './pages/Installation'
import NotFound from './pages/NotFound'

function App() {
  return (
    <AppsProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          {/* Global Navbar */}
          <Navbar />

          {/* Page Content */}
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/apps" element={<Apps />} />
              <Route path="/installation" element={<Installation />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      </Router>
    </AppsProvider>
  )
}

export default App
