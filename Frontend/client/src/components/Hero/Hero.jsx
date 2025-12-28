import backpackImage from '../../assets/backpack.avif'

export default function Hero() {
    return (
         <main className="flex-1 bg-gradient-to-b from-white to-brand-sand">
        <section className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        
          <div>
            <span className="inline-block mb-3 wstitch-badge bg-brand-gold text-white">Made to last</span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-brand-dark">
              Handcrafted bags, <span className="text-brand-gold">built for life</span>
            </h1>

            <p className="mt-6 text-lg text-gray-600 max-w-xl">
              Wstitch manufactures premium stitched goods — from durable everyday bags to custom packaging for your products. Quality stitching, reliable materials, and clean Indian craftsmanship.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <a href="#" className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-brand-gold text-white font-semibold shadow-md hover:shadow-lg transition">
                Shop Collection
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-3" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L13.586 11H4a1 1 0 110-2h9.586l-3.293-3.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </a>

              <a href="#" className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-brand-gold text-gray-700 font-medium">
                Get a quote
              </a>
            </div>

           
            <div className="mt-10 flex flex-wrap gap-6 items-center text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-gold" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" opacity="0.6" />
                </svg>
                <span><strong className="text-black">0k+</strong> bags shipped</span>
              </div>

              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-dark" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                </svg>
                <span><strong className="text-black">100%</strong> made in India</span>
              </div>
            </div>
          </div>

        
          <div className="relative">
            <div className="w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg bg-gradient-to-tr from-brand-sand to-white flex items-center justify-center">
              {/* Placeholder image area - replace with product image */}
              <img src={backpackImage} alt="Wstitch bag" className=" h-full object-contain" />
            </div>

            {/* small overlay card */}
            <div className="absolute left-6 bottom-6 bg-white p-4 rounded-xl shadow-md w-64">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-md bg-brand-gold flex items-center justify-center text-white font-bold">W</div>
                <div>
                  <div className="text-sm font-semibold text-brand-dark">Professional outlook</div>
                  <div className="text-xs text-gray-500">Starting ₹xxx/-</div>
                </div>
              </div>
            </div>
          </div>

        </section>

        
        <section className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Feature title="Premium Materials" desc="Heavy-duty fabrics and reinforced stitching." />
            <Feature title="Custom Orders" desc="Small-batch or bulk — we handle both." />
            <Feature title="Sustainable" desc="Locally sourced materials, low waste." />
          </div>
        </section>
      </main>
    )
}
function Feature({ title, desc }) {
  return (
    <div className="p-4 rounded-xl bg-white shadow-sm">
      <div className="flex items-start gap-4">
        <div className="p-3 bg-brand-sand rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-brand-dark" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
          </svg>
        </div>
        <div>
          <div className="font-semibold text-gray-900">{title}</div>
          <p className="text-sm text-gray-600 mt-2">{desc}</p>
        </div>
      </div>
    </div>
  )
}
