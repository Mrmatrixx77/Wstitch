import { Link } from "react-router-dom"

export default function Footer() {
    return (
        <footer aria-label="Site footer" className="bg-brand-gold text-white">
<div className="max-w-6xl mx-auto px-6 py-12">
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">


{/* Brand block */}
<div className="flex flex-col gap-4">
<div className="flex items-center gap-4">
{/* <div className="w-12 h-12 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 flex items-center justify-center shadow-md">
<svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
<circle cx="12" cy="12" r="12" fill="white" fillOpacity="0.12" />
<text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontFamily="ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial" fontWeight="700" fontSize="10" fill="#FFF">WS</text>
</svg>
</div> */}
<div className="w-10 h-10 rounded-md bg-brand-gold flex items-center justify-center text-white font-bold border-2 border-white-600">W</div>

<div>
<div className="font-bold text-lg">Wstitch</div>
<div className="text-sm opacity-90">Precision stitching & manufacturing</div>
</div>
</div>


<p className="text-sm opacity-90">Made in India • GST: 07HMUPK8043Q1ZV</p>


<div className="flex items-center gap-3">
<a href="https://wa.me/message/NSTKYH2754HYJ1" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-md text-sm">WhatsApp</a>
<a href="mailto:wstitch07@gmail.com" className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 px-3 py-2 rounded-md text-sm">Email</a>
</div>
</div>


{/* Links block */}
<div className="flex justify-between md:justify-center">
<div className="mr-8">
<h4 className="font-semibold mb-3">Services</h4>
<ul className="space-y-2 text-sm">
<li><a href="#services" className="hover:underline">Custom Bag Stitching</a></li>
<li><a href="#about" className="hover:underline">Private Label</a></li>
<li><a href="#contact" className="hover:underline">Bulk Orders</a></li>
</ul>
</div>
<div>
<h4 className="font-semibold mb-3">Company</h4>
<ul className="space-y-2 text-sm">
<li><a href="#about" className="hover:underline">About</a></li>
<li><a href="/terms" className="hover:underline">Terms</a></li>
<li><a href="/privacy" className="hover:underline">Privacy</a></li>
</ul>
</div>
</div>


{/* Contact / CTA block */}
<div className="flex flex-col items-start md:items-end gap-4">
<h4 className="font-semibold">Get a quote</h4>
<p className="text-sm opacity-90">Send project details — we reply within 24 hours.</p>
<a href="#contact" className="bg-white text-amber-600 font-semibold px-5 py-2 rounded-md shadow-sm">Request Quote</a>
{/* <Link to="#contact" className="bg-white text-amber-600 font-semibold px-5 py-2 rounded-md shadow-sm">Request Quote</Link> */}

{/* <form className="mt-4 w-full md:w-72" onSubmit={(e)=>e.preventDefault()}>
<label htmlFor="newsletter" className="sr-only">Email</label>
<div className="flex gap-2">
<input id="newsletter" type="email" placeholder="Your email" className="w-full px-3 py-2 rounded-md text-amber-900" />
<button className="bg-amber-800/20 hover:bg-amber-800/30 px-3 py-2 rounded-md text-sm">Join</button>
</div>
</form> */}
</div>
</div>


<div className="mt-10 border-t-2 border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between text-sm gap-4">
<div>© {new Date().getFullYear()} Wstitch — All rights reserved</div>
<div className="flex items-center gap-4">
<a href="#" className="hover:underline">Instagram</a>
<a href="#" className="hover:underline">LinkedIn</a>
<a href="#" className="hover:underline">Facebook</a>
</div>
</div>
</div>
</footer>
)
}
    
