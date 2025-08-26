// 'use client'

// import { useEffect, useState } from 'react'
// import axios from '@/util/axios'
// import useEmployerGuard from '@/hooks/useEmployerGuard'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'

// type Job = {
//   _id: string
//   title: string
//   description: string
//   createdAt: string
// }

// export default function EmployerDashboard() {
//   useEmployerGuard()
//   const [jobs, setJobs] = useState<Job[]>([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState('')
//   const [search, setSearch] = useState('') // added for search
//   const router = useRouter()

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('role')
//     localStorage.removeItem('user')
//     router.push('/')
//   }

//   const fetchJobs = async () => {
//     try {
//       const { data } = await axios.get('/employer/jobs')
//       setJobs(data.jobs)
//     } catch (e: any) {
//       setError(e.response?.data?.message || 'Failed to load jobs')
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleDelete = async (id: string) => {
//     if (!confirm('Delete this job?')) return
//     try {
//       await axios.delete(`/employer/jobs/${id}`)
//       setJobs((prev) => prev.filter((j) => j._id !== id))
//     } catch (e: any) {
//       alert(e.response?.data?.message || 'Delete failed')
//     }
//   }

//   useEffect(() => {
//     fetchJobs()
//   }, [])

//   const formatDate = (dateStr: string) => {
//     const date = new Date(dateStr)
//     return date.toLocaleDateString(undefined, {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric',
//     })
//   }

//   // filter jobs based on search query
//   const filteredJobs = jobs.filter((job) =>
//     job.title.toLowerCase().includes(search.toLowerCase())
//   )

//   return (
//     <div className='min-h-screen bg-gray-50'>
//       {/* Header */}
//       <header className='border-b bg-white shadow-sm'>
//         <div className='max-w-5xl mx-auto px-4 py-4 flex items-center justify-between'>
//           <h1 className='text-2xl font-bold text-[#1E40AF]'>
//             TalentHub — Employer
//           </h1>
//           <div className='flex items-center gap-3'>
//             <Link
//               href='/employer/jobs/new'
//               className='bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-lg shadow-sm transition'
//             >
//               + Post Job
//             </Link>
//             <button
//               onClick={handleLogout}
//               className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm transition'
//             >
//               Logout
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main */}
//       <main className='max-w-5xl mx-auto px-4 py-8'>
//         <h2 className='text-xl font-semibold mb-4 text-[#1E40AF]'>My Jobs</h2>

//         {/* Search */}
//         <div className='mb-4'>
//           <input
//             type='text'
//             placeholder='Search jobs by title...'
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className='w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
//           />
//         </div>

//         {loading && <p className='text-gray-500'>Loading...</p>}
//         {error && <p className='text-red-600'>{error}</p>}

//         {/* Jobs List */}
//         <div className='space-y-6'>
//           {filteredJobs.map((job) => (
//             <div
//               key={job._id}
//               className='rounded-2xl border bg-white shadow-sm hover:shadow-md transition p-6'
//             >
//               <h3 className='text-lg font-semibold text-[#1E40AF]'>
//                 {job.title}
//               </h3>
//               <p className='text-gray-600 mt-2 line-clamp-3'>
//                 {job.description}
//               </p>
//               <p className='text-sm text-gray-400 mt-1'>
//                 Posted on {formatDate(job.createdAt)}
//               </p>

//               <div className='flex flex-wrap gap-3 mt-4'>
//                 <Link
//                   href={`/employer/jobs/${job._id}/applications`}
//                   className='px-4 py-2 rounded-lg border border-[#1E40AF] text-[#1E40AF] hover:bg-blue-50 transition'
//                 >
//                   View Applications
//                 </Link>
//                 <button
//                   onClick={() => handleDelete(job._id)}
//                   className='px-4 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 transition'
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State */}
//         {!loading && filteredJobs.length === 0 && (
//           <p className='text-gray-500 mt-10 text-center italic'>
//             No jobs yet. Post your first role!
//           </p>
//         )}
//       </main>
//     </div>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import axios from '@/util/axios'
import useEmployerGuard from '@/hooks/useEmployerGuard'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Job = {
  _id: string
  title: string
  description: string
  createdAt: string
}

export default function EmployerDashboard() {
  useEmployerGuard()
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('') // added for search
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

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get('/employer/jobs')
      setJobs(data.jobs)
    } catch (e: unknown) {
      setError('Failed to load jobs')
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this job?')) return
    try {
      await axios.delete(`/employer/jobs/${id}`)
      setJobs((prev) => prev.filter((j) => j._id !== id))
    } catch (e: unknown) {
      alert('Delete failed')
      console.log(e)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div
      className={
        theme === 'dark'
          ? 'min-h-screen bg-gray-900 text-white'
          : 'min-h-screen bg-gray-50'
      }
    >
      {/* Header */}
      <header
        className={`border-b shadow-sm ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <div className='max-w-5xl mx-auto px-4 py-4 flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-[#1E40AF]'>
            TalentHub — Employer
          </h1>
          <div className='flex items-center gap-3'>
            <Link
              href='/employer/jobs/new'
              className='bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-lg shadow-sm transition'
            >
              Post
            </Link>
            <button
              onClick={handleLogout}
              className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm transition'
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className='max-w-5xl mx-auto px-4 py-8'>
        <h2 className='text-xl font-semibold mb-4 text-[#1E40AF]'>My Jobs</h2>

        {/* Search */}
        <div className='mb-4'>
          <input
            type='text'
            placeholder='Search jobs by title...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 text-white border-gray-600'
                : 'border-gray-300 text-gray-900'
            }`}
          />
        </div>

        {loading && (
          <p className={theme === 'dark' ? 'text-gray-200' : 'text-gray-500'}>
            Loading...
          </p>
        )}
        {error && <p className='text-red-600'>{error}</p>}

        {/* Jobs List */}
        <div className='space-y-6'>
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className={`rounded-2xl border shadow-sm hover:shadow-md transition p-6 ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'
              }`}
            >
              <h3 className='text-lg font-semibold text-[#1E40AF]'>
                {job.title}
              </h3>
              <p
                className={
                  theme === 'dark'
                    ? 'text-gray-200 mt-2 line-clamp-3'
                    : 'text-gray-600 mt-2 line-clamp-3'
                }
              >
                {job.description}
              </p>
              <p
                className={
                  theme === 'dark'
                    ? 'text-gray-400 text-sm mt-1'
                    : 'text-gray-400 text-sm mt-1'
                }
              >
                Posted on {formatDate(job.createdAt)}
              </p>

              <div className='flex flex-wrap gap-3 mt-4'>
                <Link
                  href={`/employer/jobs/${job._id}/applications`}
                  className='px-4 py-2 rounded-lg border border-[#1E40AF] text-[#1E40AF] hover:bg-blue-50 transition'
                >
                  View Applications
                </Link>
                <button
                  onClick={() => handleDelete(job._id)}
                  className='px-4 py-2 rounded-lg border border-red-500 text-red-600 hover:bg-red-50 transition'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {!loading && filteredJobs.length === 0 && (
          <p
            className={
              theme === 'dark'
                ? 'text-gray-200 mt-10 text-center italic'
                : 'text-gray-500 mt-10 text-center italic'
            }
          >
            No jobs yet. Post your first role!
          </p>
        )}
      </main>
    </div>
  )
}
