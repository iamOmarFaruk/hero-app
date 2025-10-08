function Facts() {
  return (
    <section className="bg-[#7C3AED] py-16">
      <div className="mx-auto max-w-6xl px-6 text-center md:px-10">
        <h2 className="mb-12 text-3xl font-bold text-white md:text-4xl">
          Trusted By Millions, Built For You
        </h2>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Total Downloads */}
          <div className="flex flex-col items-center">
            <div className="mb-2 text-sm text-purple-200">Total Downloads</div>
            <div className="mb-2 text-4xl font-bold text-white md:text-5xl">
              29.6M
            </div>
            <div className="text-xs text-purple-300">
              21% More Than Last Month
            </div>
          </div>

          {/* Total Reviews */}
          <div className="flex flex-col items-center">
            <div className="mb-2 text-sm text-purple-200">Total Reviews</div>
            <div className="mb-2 text-4xl font-bold text-white md:text-5xl">
              906K
            </div>
            <div className="text-xs text-purple-300">
              46% More Than Last Month
            </div>
          </div>

          {/* Active Apps */}
          <div className="flex flex-col items-center">
            <div className="mb-2 text-sm text-purple-200">Active Apps</div>
            <div className="mb-2 text-4xl font-bold text-white md:text-5xl">
              132+
            </div>
            <div className="text-xs text-purple-300">
              31 More Will Launch
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Facts