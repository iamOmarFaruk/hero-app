import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Welcome to Home Page</h1>
        <p className="text-lg text-gray-600 mb-8">This is the home page of your application</p>
        <div className="space-x-4">
          <Link 
            to="/apps" 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Visit Apps
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home