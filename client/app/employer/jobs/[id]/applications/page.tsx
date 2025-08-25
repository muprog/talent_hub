// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import axios from '@/util/axios'
// import useEmployerGuard from '@/hooks/useEmployerGuard'

// type AppItem = {
//   _id: string
//   status: string
//   resume: string
//   userId: { _id: string; name: string; email: string }
// }

// export default function JobApplicationsPage() {
//   useEmployerGuard()
//   const params = useParams() as { id: string }
//   const [apps, setApps] = useState<AppItem[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const router = useRouter()

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('role')
//     localStorage.removeItem('user')
//     router.push('/')
//   }

//   const load = async () => {
//     try {
//       const { data } = await axios.get(
//         `/employer/jobs/${params.id}/applications`
//       )
//       setApps(data.applications)
//     } catch (e: any) {
//       setError(e.response?.data?.message || 'Failed to load applications')
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     load()
//   }, [])

//   return (
//     <div className='min-h-screen bg-gray-50'>
//       {/* Header */}
//       <div className='max-w-4xl mx-auto px-4 py-6 flex justify-between items-center border-b bg-white shadow-sm'>
//         <h1 className='text-2xl font-bold text-[#1E40AF]'>Applications</h1>
//         <button
//           onClick={handleLogout}
//           className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm transition'
//         >
//           Logout
//         </button>
//       </div>

//       {/* Content */}
//       <div className='max-w-4xl mx-auto px-4 py-8'>
//         {loading && <p className='text-gray-500'>Loading...</p>}
//         {error && <p className='text-red-600'>{error}</p>}

//         <div className='mt-6 space-y-6'>
//           {apps.map((a) => (
//             <div
//               key={a._id}
//               className='border rounded-2xl bg-white shadow-sm hover:shadow-md transition p-6'
//             >
//               <div className='font-medium text-lg text-[#1E40AF]'>
//                 {a.userId?.name}
//               </div>
//               <div className='text-gray-600 text-sm'>{a.userId?.email}</div>

//               <div className='mt-3 text-sm'>
//                 Status:{' '}
//                 <span
//                   className={`font-semibold ${
//                     a.status === 'pending'
//                       ? 'text-yellow-600'
//                       : a.status === 'accepted'
//                       ? 'text-green-600'
//                       : 'text-red-600'
//                   }`}
//                 >
//                   {a.status}
//                 </span>
//               </div>

//               {a.resume && (
//                 <a
//                   href={`${
//                     process.env.NEXT_PUBLIC_BACKEND_URL
//                   }/${a.resume.replace(/\\/g, '/')}`}
//                   target='_blank'
//                   rel='noopener noreferrer'
//                   className='inline-block mt-4 px-4 py-2 rounded-lg border border-[#1E40AF] text-[#1E40AF] hover:bg-blue-50 transition'
//                 >
//                   View CV
//                 </a>
//               )}
//             </div>
//           ))}

//           {!loading && apps.length === 0 && (
//             <p className='text-gray-500 text-center italic'>
//               No applications yet.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// ////////////////////////
// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import axios from '@/util/axios'
// import useEmployerGuard from '@/hooks/useEmployerGuard'

// type AppItem = {
//   _id: string
//   status: string
//   resume: string
//   userId: { _id: string; name: string; email: string }
// }

// export default function JobApplicationsPage() {
//   useEmployerGuard()
//   const params = useParams() as { id: string }
//   const [apps, setApps] = useState<AppItem[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const router = useRouter()

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('role')
//     localStorage.removeItem('user')
//     router.push('/')
//   }

//   const load = async () => {
//     try {
//       const { data } = await axios.get(
//         `/employer/jobs/${params.id}/applications`
//       )
//       setApps(data.applications)
//     } catch (e: any) {
//       setError(e.response?.data?.message || 'Failed to load applications')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const updateStatus = async (id: string, status: string) => {
//     try {
//       const { data } = await axios.post(`/applications/${id}/status`, {
//         status,
//       })
//       setApps((prev) =>
//         prev.map((app) => (app._id === id ? data.application : app))
//       )
//     } catch (err: any) {
//       alert(err.response?.data?.message || 'Failed to update status')
//     }
//   }

//   useEffect(() => {
//     load()
//   }, [])

//   return (
//     <div className='min-h-screen bg-gray-50'>
//       {/* Header */}
//       <div className='max-w-4xl mx-auto px-4 py-6 flex justify-between items-center border-b bg-white shadow-sm'>
//         <h1 className='text-2xl font-bold text-[#1E40AF]'>Applications</h1>
//         <button
//           onClick={handleLogout}
//           className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm transition'
//         >
//           Logout
//         </button>
//       </div>

//       {/* Content */}
//       <div className='max-w-4xl mx-auto px-4 py-8'>
//         {loading && <p className='text-gray-500'>Loading...</p>}
//         {error && <p className='text-red-600'>{error}</p>}

//         <div className='mt-6 space-y-6'>
//           {apps.map((a) => (
//             <div
//               key={a._id}
//               className='border rounded-2xl bg-white shadow-sm hover:shadow-md transition p-6'
//             >
//               <div className='font-medium text-lg text-[#1E40AF]'>
//                 {a.userId?.name}
//               </div>
//               <div className='text-gray-600 text-sm'>{a.userId?.email}</div>

//               <div className='mt-3 text-sm'>
//                 Status:{' '}
//                 <span
//                   className={`font-semibold ${
//                     a.status === 'pending'
//                       ? 'text-yellow-600'
//                       : a.status === 'accepted'
//                       ? 'text-green-600'
//                       : a.status === 'shortlisted'
//                       ? 'text-blue-600'
//                       : 'text-red-600'
//                   }`}
//                 >
//                   {a.status}
//                 </span>
//               </div>

//               {a.resume && (
//                 <a
//                   href={`${
//                     process.env.NEXT_PUBLIC_BACKEND_URL
//                   }/${a.resume.replace(/\\/g, '/')}`}
//                   target='_blank'
//                   rel='noopener noreferrer'
//                   className='inline-block mt-4 px-4 py-2 rounded-lg border border-[#1E40AF] text-[#1E40AF] hover:bg-blue-50 transition'
//                 >
//                   View CV
//                 </a>
//               )}

//               {/* Action Buttons */}
//               <div className='mt-4 flex gap-3'>
//                 {a.status !== 'accepted' && (
//                   <button
//                     onClick={() => updateStatus(a._id, 'accepted')}
//                     className='px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition'
//                   >
//                     Accept
//                   </button>
//                 )}
//                 {a.status !== 'shortlisted' && (
//                   <button
//                     onClick={() => updateStatus(a._id, 'shortlisted')}
//                     className='px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition'
//                   >
//                     Shortlist
//                   </button>
//                 )}
//                 {a.status !== 'rejected' && (
//                   <button
//                     onClick={() => updateStatus(a._id, 'rejected')}
//                     className='px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition'
//                   >
//                     Reject
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}

//           {!loading && apps.length === 0 && (
//             <p className='text-gray-500 text-center italic'>
//               No applications yet.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// 'use client'

// import { useEffect, useState } from 'react'
// import { useParams, useRouter } from 'next/navigation'
// import axios from '@/util/axios'
// import useEmployerGuard from '@/hooks/useEmployerGuard'

// type AppItem = {
//   _id: string
//   status: string
//   resume: string
//   userId: { _id: string; name: string; email: string }
// }

// export default function JobApplicationsPage() {
//   useEmployerGuard()
//   const params = useParams() as { id: string }
//   const [apps, setApps] = useState<AppItem[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [filter, setFilter] = useState<
//     'all' | 'accepted' | 'shortlisted' | 'rejected'
//   >('all')
//   const router = useRouter()

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('role')
//     localStorage.removeItem('user')
//     router.push('/')
//   }

//   const load = async () => {
//     try {
//       const { data } = await axios.get(
//         `/employer/jobs/${params.id}/applications`
//       )
//       setApps(data.applications)
//     } catch (e: any) {
//       setError(e.response?.data?.message || 'Failed to load applications')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const updateStatus = async (id: string, status: string) => {
//     try {
//       const { data } = await axios.post(`/applications/${id}/status`, {
//         status,
//       })
//       setApps((prev) =>
//         prev.map((app) => (app._id === id ? data.application : app))
//       )
//     } catch (err: any) {
//       alert(err.response?.data?.message || 'Failed to update status')
//     }
//   }

//   useEffect(() => {
//     load()
//   }, [])

//   // Filtered applications based on tab
//   const filteredApps =
//     filter === 'all' ? apps : apps.filter((app) => app.status === filter)

//   return (
//     <div className='min-h-screen bg-gray-50'>
//       {/* Header */}
//       <div className='max-w-4xl mx-auto px-4 py-6 flex justify-between items-center border-b bg-white shadow-sm'>
//         <h1 className='text-2xl font-bold text-[#1E40AF]'>Applications</h1>
//         <button
//           onClick={handleLogout}
//           className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm transition'
//         >
//           Logout
//         </button>
//       </div>

//       {/* Tabs */}
//       <div className='max-w-4xl mx-auto px-4 py-4 flex gap-4 border-b'>
//         {['all', 'shortlisted', 'accepted', 'rejected'].map((status) => (
//           <button
//             key={status}
//             onClick={() => setFilter(status as any)}
//             className={`px-4 py-2 rounded-lg font-semibold transition ${
//               filter === status
//                 ? 'bg-blue-600 text-white'
//                 : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
//             }`}
//           >
//             {status.charAt(0).toUpperCase() + status.slice(1)}
//           </button>
//         ))}
//       </div>

//       {/* Content */}
//       <div className='max-w-4xl mx-auto px-4 py-8'>
//         {loading && <p className='text-gray-500'>Loading...</p>}
//         {error && <p className='text-red-600'>{error}</p>}

//         <div className='mt-6 space-y-6'>
//           {filteredApps.map((a) => (
//             <div
//               key={a._id}
//               className='border rounded-2xl bg-white shadow-sm hover:shadow-md transition p-6'
//             >
//               <div className='font-medium text-lg text-[#1E40AF]'>
//                 {a.userId?.name}
//               </div>
//               <div className='text-gray-600 text-sm'>{a.userId?.email}</div>

//               <div className='mt-3 text-sm'>
//                 Status:{' '}
//                 <span
//                   className={`font-semibold ${
//                     a.status === 'pending'
//                       ? 'text-yellow-600'
//                       : a.status === 'accepted'
//                       ? 'text-green-600'
//                       : a.status === 'shortlisted'
//                       ? 'text-blue-600'
//                       : 'text-red-600'
//                   }`}
//                 >
//                   {a.status}
//                 </span>
//               </div>

//               {a.resume && (
//                 <a
//                   href={`${
//                     process.env.NEXT_PUBLIC_BACKEND_URL
//                   }/${a.resume.replace(/\\/g, '/')}`}
//                   target='_blank'
//                   rel='noopener noreferrer'
//                   className='inline-block mt-4 px-4 py-2 rounded-lg border border-[#1E40AF] text-[#1E40AF] hover:bg-blue-50 transition'
//                 >
//                   View CV
//                 </a>
//               )}

//               {/* Action Buttons */}
//               <div className='mt-4 flex gap-3'>
//                 {a.status !== 'accepted' && (
//                   <button
//                     onClick={() => updateStatus(a._id, 'accepted')}
//                     className='px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition'
//                   >
//                     Accept
//                   </button>
//                 )}
//                 {a.status !== 'shortlisted' && (
//                   <button
//                     onClick={() => updateStatus(a._id, 'shortlisted')}
//                     className='px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition'
//                   >
//                     Shortlist
//                   </button>
//                 )}
//                 {a.status !== 'rejected' && (
//                   <button
//                     onClick={() => updateStatus(a._id, 'rejected')}
//                     className='px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition'
//                   >
//                     Reject
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}

//           {!loading && filteredApps.length === 0 && (
//             <p className='text-gray-500 text-center italic'>
//               No applications for this status.
//             </p>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from '@/util/axios'
import useEmployerGuard from '@/hooks/useEmployerGuard'

type AppItem = {
  _id: string
  status: string
  resume: string
  userId: { _id: string; name: string; email: string }
}

export default function JobApplicationsPage() {
  useEmployerGuard()
  const params = useParams() as { id: string }
  const [apps, setApps] = useState<AppItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [filter, setFilter] = useState<
    'all' | 'accepted' | 'shortlisted' | 'rejected'
  >('all')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const router = useRouter()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) setTheme(savedTheme)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
    router.push('/')
  }

  const load = async () => {
    try {
      const { data } = await axios.get(
        `/employer/jobs/${params.id}/applications`
      )
      setApps(data.applications)
    } catch (e: any) {
      setError(e.response?.data?.message || 'Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id: string, status: string) => {
    try {
      const { data } = await axios.post(`/applications/${id}/status`, {
        status,
      })
      setApps((prev) =>
        prev.map((app) => (app._id === id ? data.application : app))
      )
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to update status')
    }
  }

  useEffect(() => {
    load()
  }, [])

  const filteredApps =
    filter === 'all' ? apps : apps.filter((app) => app.status === filter)

  return (
    <div
      className={
        theme === 'dark'
          ? 'min-h-screen bg-gray-900 text-white'
          : 'min-h-screen bg-gray-50'
      }
    >
      {/* Header */}
      <div
        className={`max-w-4xl mx-auto px-4 py-6 flex justify-between items-center border-b shadow-sm ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <h1 className='text-2xl font-bold text-[#1E40AF]'>Applications</h1>
        <button
          onClick={handleLogout}
          className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm transition'
        >
          Logout
        </button>
      </div>

      {/* Tabs */}
      <div className='max-w-4xl mx-auto px-4 py-4 flex gap-4 border-b'>
        {['all', 'shortlisted', 'accepted', 'rejected'].map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status as any)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              filter === status
                ? 'bg-blue-600 text-white'
                : theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className='max-w-4xl mx-auto px-4 py-8'>
        {loading && (
          <p className={theme === 'dark' ? 'text-gray-200' : 'text-gray-500'}>
            Loading...
          </p>
        )}
        {error && <p className='text-red-600'>{error}</p>}

        <div className='mt-6 space-y-6'>
          {filteredApps.map((a) => (
            <div
              key={a._id}
              className={`border rounded-2xl shadow-sm hover:shadow-md transition p-6 ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
              }`}
            >
              <div className='font-medium text-lg text-[#1E40AF]'>
                {a.userId?.name}
              </div>
              <div
                className={
                  theme === 'dark'
                    ? 'text-gray-300 text-sm'
                    : 'text-gray-600 text-sm'
                }
              >
                {a.userId?.email}
              </div>

              <div className='mt-3 text-sm'>
                Status:{' '}
                <span
                  className={`font-semibold ${
                    a.status === 'pending'
                      ? 'text-yellow-600'
                      : a.status === 'accepted'
                      ? 'text-green-600'
                      : a.status === 'shortlisted'
                      ? 'text-blue-600'
                      : 'text-red-600'
                  }`}
                >
                  {a.status}
                </span>
              </div>

              {a.resume && (
                <a
                  href={`${
                    process.env.NEXT_PUBLIC_BACKEND_URL
                  }/${a.resume.replace(/\\/g, '/')}`}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-block mt-4 px-4 py-2 rounded-lg border border-[#1E40AF] text-[#1E40AF] hover:bg-blue-50 transition'
                >
                  View CV
                </a>
              )}

              <div className='mt-4 flex gap-3'>
                {a.status !== 'accepted' && (
                  <button
                    onClick={() => updateStatus(a._id, 'accepted')}
                    className='px-3 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition'
                  >
                    Accept
                  </button>
                )}
                {a.status !== 'shortlisted' && (
                  <button
                    onClick={() => updateStatus(a._id, 'shortlisted')}
                    className='px-3 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition'
                  >
                    Shortlist
                  </button>
                )}
                {a.status !== 'rejected' && (
                  <button
                    onClick={() => updateStatus(a._id, 'rejected')}
                    className='px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition'
                  >
                    Reject
                  </button>
                )}
              </div>
            </div>
          ))}

          {!loading && filteredApps.length === 0 && (
            <p
              className={
                theme === 'dark'
                  ? 'text-gray-200 text-center italic'
                  : 'text-gray-500 text-center italic'
              }
            >
              No applications for this status.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
