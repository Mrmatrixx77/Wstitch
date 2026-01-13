// export default function AdminModal({ onClose }) {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
//       <div className="bg-white rounded-lg w-full max-w-md p-6 shadow-xl">

//         {/* Header */}
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-lg font-semibold">Add New Admin</h2>
//           <button
//             onClick={onClose}
//             className="text-gray-500 hover:text-black text-xl"
//           >
//             ×
//           </button>
//         </div>

//         {/* Form */}
//         <form className="space-y-4">
//           <div>
//             <label className="block text-sm font-medium">Email</label>
//             <input
//               type="email"
//               className="w-full border rounded px-3 py-2 mt-1"
//               placeholder="admin@email.com"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium">Password</label>
//             <input
//               type="password"
//               className="w-full border rounded px-3 py-2 mt-1"
//               placeholder="********"
//             />
//           </div>

//           <div className="flex justify-end gap-3 pt-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 text-sm border rounded"
//             >
//               Cancel
//             </button>

//             <button
//               type="submit"
//               className="px-4 py-2 text-sm bg-brand-gold text-white rounded font-semibold"
//             >
//               Create Admin
//             </button>
//           </div>
//         </form>

//       </div>
//     </div>
//   )
// }


import { useState } from 'react'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL

export default function AdminModal({ onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      await axios.post(
        `${API_BASE}/api/admin/createadmin`,
        { email, password, name },
        { withCredentials: true }
      )

      alert('Admin created successfully')
      onClose()

    } catch (err) {
      setError(err?.response?.data?.error || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-md p-6">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Add New Admin</h2>
          <button onClick={onClose} className="text-xl">×</button>
        </div>

        <form onSubmit={submit} className="space-y-4">
          {error && <p className="text-red-600 text-sm">{error}</p>}

          <input
            type="text"
            placeholder="Name (optional)"
            className="w-full border px-3 py-2 rounded"
            value={name}
            onChange={e => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border px-3 py-2 rounded"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            required
            className="w-full border px-3 py-2 rounded"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="border px-4 py-2 rounded">
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="bg-brand-gold text-white px-4 py-2 rounded font-semibold"
            >
              {loading ? 'Creating...' : 'Create Admin'}
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
