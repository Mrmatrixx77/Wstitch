import axios from 'axios'
import { useEffect, useState } from 'react'

export default function AdminDashboard() {
  const [leads, setLeads] = useState([])

  useEffect(() => {
    const fetchLeads = async () => {
      const token = localStorage.getItem('adminToken')
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/admin/leads`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      setLeads(res.data.data)
    }

    fetchLeads()
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Leads</h1>

      <div className="grid gap-4">
        {leads.map((l) => (
          <div key={l._id} className="border p-4 rounded">
            <p><b>Name:</b> {l.name}</p>
            <p><b>Email:</b> {l.email}</p>
            <p><b>Phone:</b> {l.phone}</p>
            <p><b>Message:</b> {l.message}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
