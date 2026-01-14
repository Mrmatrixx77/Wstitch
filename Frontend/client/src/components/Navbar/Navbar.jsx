export default function Navbar() {
    return (

         <header className="w-full bg-white/60 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-brand-gold flex items-center justify-center text-white font-bold">W</div>
            <span className="font-semibold text-lg text-brand-gold">Wstitch</span>
          </div>
            {/* <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700">
            <a href="#" className="hover:text-brand-dark">Products</a>
            <a href="#" className="hover:text-brand-dark">How it works</a>
            <a href="#" className="hover:text-brand-dark">Pricing</a>
          </nav> */}

          <div className="md:hidden">
              <button aria-label="Open menu">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    )
}