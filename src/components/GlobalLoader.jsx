function GlobalLoader({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        {/* Spinning Circle with gradient */}
        <div className="relative inline-block mb-6">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-gray-200 border-t-[#7C3AED] border-r-[#8B5CF6] motion-reduce:animate-[spin_1.5s_linear_infinite]">
          </div>
          {/* Inner pulsing dot */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-3 w-3 bg-[#7C3AED] rounded-full animate-pulse"></div>
          </div>
        </div>
        
        {/* Loading Message with fade animation */}
        <p className="text-lg font-medium text-gray-700 animate-pulse">{message}</p>
        
        {/* Subtle subtitle */}
        <p className="text-sm text-gray-500 mt-2 animate-pulse" style={{ animationDelay: '0.5s' }}>
          Please wait while we prepare everything for you
        </p>
      </div>
    </div>
  )
}

export default GlobalLoader