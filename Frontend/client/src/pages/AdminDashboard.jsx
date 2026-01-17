// import axios from 'axios'
// import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import AdminModal from '../components/Admin/AdminModal'

// const API_URL = import.meta.env.VITE_API_URL ;

// export default function AdminDashboard() {
//   const [leads, setLeads] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [showAdminModal, setShowAdminModal] = useState(false)

//   const navigate = useNavigate()

//   useEffect(() => {
//     let mounted = true

//     const fetchLeads = async () => {
//       try {
//         const res = await axios.get(
//           `${API_URL}/api/admin/leads`,
//           {
//             withCredentials: true, // ✅ cookie-based auth
//             timeout: 8000
//           }
//         )

//         if (!mounted) return
//         setLeads(res.data?.data || [])
//       } catch (err) {
//         console.error('Fetch leads failed', err?.response || err.message)

//         if (err?.response?.status === 401 || err?.response?.status === 403) {
//           navigate('/login', { replace: true })
//         }
//       } finally {
//         if (mounted) setLoading(false)
//       }
//     }

//     fetchLeads()
//     return () => { mounted = false }
//   }, [navigate])

//   return (
//     <div className="p-8 bg-gray-50 min-h-screen">

//       {/* Header */}
//       <div className="flex items-center justify-between mb-6">
//         <h1 className="text-2xl font-bold">Admin Dashboard</h1>

//         <button
//           onClick={() => setShowAdminModal(true)}
//           className="bg-brand-gold text-white px-4 py-2 rounded font-semibold hover:opacity-90"
//         >
//           + Add Admin
//         </button>
//       </div>

//       {/* Add Admin Modal */}
//       {showAdminModal && (
//         <AdminModal onClose={() => setShowAdminModal(false)} />
//       )}

//       {/* Leads */}
//       {/* {loading ? (
//         <p className="text-gray-600">Loading leads…</p>
//       ) : (
//         <div className="grid gap-4">
//           {leads.length === 0 && (
//             <p className="text-gray-500">No leads yet.</p>
//           )}

//           {leads.map((l) => (
//             <div
//               key={l._id}
//               className="border bg-white p-4 rounded shadow-sm"
//             >
//               <p><b>Name:</b> {l.name}</p>
//               <p><b>Email:</b> {l.email}</p>
//               <p><b>Phone:</b> {l.phone}</p>
//               {l.message && <p><b>Message:</b> {l.message}</p>}
//             </div>
//           ))}
//         </div>
//       )} */}

//     </div>
//   )
// }
