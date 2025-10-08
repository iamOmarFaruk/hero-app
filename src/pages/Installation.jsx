function Installation() {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-purple-50">
      <div className="text-center max-w-4xl px-6">
        <h1 className="text-4xl font-bold text-purple-900 mb-4">Installation Guide</h1>
        <p className="text-lg text-purple-700 mb-8">
          Follow these simple steps to get started with Hero.io
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Step 1: Install CLI</h3>
            <div className="bg-gray-100 p-3 rounded font-mono text-sm">
              npm install -g hero-cli
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Step 2: Initialize Project</h3>
            <div className="bg-gray-100 p-3 rounded font-mono text-sm">
              hero init my-project
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Step 3: Start Development</h3>
            <div className="bg-gray-100 p-3 rounded font-mono text-sm">
              hero dev
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Step 4: Deploy</h3>
            <div className="bg-gray-100 p-3 rounded font-mono text-sm">
              hero deploy
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-purple-900 mb-4">Need Help?</h2>
          <p className="text-purple-700">
            Check out our documentation or join our community for support.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Installation