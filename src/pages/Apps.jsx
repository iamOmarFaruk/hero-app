import { Link } from 'react-router-dom'

function Apps() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-blue-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">Apps Page</h1>
        <p className="text-lg text-blue-700 mb-8">Here you can find all available applications</p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">App 1</h3>
            <p className="text-gray-600">Description of App 1</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">App 2</h3>
            <p className="text-gray-600">Description of App 2</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">App 3</h3>
            <p className="text-gray-600">Description of App 3</p>
          </div>
        </div>
        <div className="mt-8">
          <Link 
            to="/" 
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Apps