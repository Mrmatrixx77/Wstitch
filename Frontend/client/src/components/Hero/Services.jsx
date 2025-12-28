import React from 'react'


const services = [
{title:'Custom Bag Stitching', desc:'From prototypes to production-ready runs. Small batches welcome.'},
{title:'Private Label Manufacturing', desc:"We'll stitch, label, and pack under your brand's name."},
{title:'Bulk Orders & B2B', desc:'Competitive pricing and reliable lead times for large orders.'},
{title:'Quality Control & Packaging', desc:'Inspection at every stage; brand-ready packing options.'}
]


export default function Services(){
return (
<section id="services" className="py-12">
<h2 className="text-2xl font-bold text-brand-gold mb-6">What we do</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
{services.map(s=> (
<div key={s.title} className="bg-white rounded-lg p-6 shadow-lg">
<h3 className="font-semibold text-brand-gold">{s.title}</h3>
<p className="mt-2 text-gray-600">{s.desc}</p>
</div>
))}
</div>
</section>
)
}