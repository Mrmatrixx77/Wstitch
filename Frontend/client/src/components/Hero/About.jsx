import React from 'react'


export default function About(){
return (
<section id="about" className="py-12">
<h2 className="text-2xl font-bold text-brand-gold mb-4">About Wstitch</h2>
<p className="text-gray-700">Wstitch is a manufacturer specialized in stitched goods — bags, accessories and fabric-based products. We combine hand-finishing with machine precision. Our process is designed for speed and consistency: sample → pre-production → production → QC → dispatch.
</p>
<ul className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 shadow-lg">
<li className="bg-white p-4 rounded-lg shadow-sm">ISO-inspired checks</li>
<li className="bg-white p-4 rounded-lg shadow-sm">Flexible MOQs</li>
<li className="bg-white p-4 rounded-lg shadow-sm">Packaging & labelling</li>
</ul>
</section>
)
}