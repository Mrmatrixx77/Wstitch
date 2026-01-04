import React, {useState} from 'react'
import axios from 'axios'


export default function ContactForm(){
const [form, setForm] = useState({name:'',email:'',phone:'',message:''})
const [status, setStatus] = useState('')


const handleChange = e => setForm({...form, [e.target.name]: e.target.value})

const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus('sending');
  try {
    // optional: basic client-side validation
    if (!form.name || !form.email || !form.phone) {
      setStatus('error');
      return;
    }

    const api = import.meta.env.VITE_API_URL;
    // use axios POST
    await axios.post(`${api}/api/leads`, form, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000
    });

    setStatus('sent');
    setForm({ name: '', email: '', phone: '', message: '' });
  } catch (err) {
    console.error('Lead submit error:', err);
    setStatus('error');
  }
};


return (
<section id="contact" className="py-12">
<h2 className="text-2xl font-bold mb-4">Contact & Get Quote</h2>
<form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
<input required name="name" value={form.name} onChange={handleChange} placeholder="Your name" className="p-3 rounded-md border" />
<input required name="email" value={form.email} onChange={handleChange} placeholder="Email" className="p-3 rounded-md border" />
<input required name="phone" value={form.phone} onChange={handleChange} placeholder="Phone / WhatsApp" className="p-3 rounded-md border" />
<textarea required name="message" value={form.message} onChange={handleChange} placeholder="Tell us about your project (qty, material, timeline)" className="p-3 rounded-md border md:col-span-2" />
<div className="md:col-span-2 flex items-center gap-3">
<button type="submit" className="bg-brand-gold text-white px-5 py-3 rounded-lg font-semibold">Send Request</button>
<div className="text-sm text-gray-600">{status === 'sending' ? 'Sending...' : status === 'sent' ? 'Thanks — we will reach out within 24 hours.' : status === 'error' ? 'Error submitting — try WhatsApp.' : ''}</div>
</div>
</form>
</section>
)
}