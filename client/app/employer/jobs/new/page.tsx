// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import axios from '@/util/axios'
// import useEmployerGuard from '@/hooks/useEmployerGuard'

// export default function NewJobPage() {
//   useEmployerGuard()
//   const router = useRouter()
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [message, setMessage] = useState('')

//   const submit = async () => {
//     try {
//       const { data } = await axios.post('/employer/jobs', {
//         title,
//         description,
//       })
//       setMessage('Job created')
//       setTimeout(() => router.push('/employer/dashboard'), 800)
//     } catch (e: any) {
//       setMessage(e.response?.data?.message || 'Error')
//     }
//   }

//   return (
//     <div className='min-h-screen bg-white'>
//       <div className='max-w-2xl mx-auto px-4 py-10'>
//         <h1 className='text-2xl font-bold text-[#1E40AF]'>Post a Job</h1>

//         <div className='mt-6 space-y-4'>
//           <div>
//             <label className='block text-sm font-medium text-gray-700'>
//               Title
//             </label>
//             <input
//               className='mt-1 w-full rounded-lg border p-3'
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder='e.g., Frontend Developer'
//             />
//           </div>

//           <div>
//             <label className='block text-sm font-medium text-gray-700'>
//               Description
//             </label>
//             <textarea
//               className='mt-1 w-full rounded-lg border p-3 h-40'
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder='Role description, responsibilities, requirements...'
//             />
//           </div>

//           <button
//             onClick={submit}
//             className='bg-[#10B981] text-white px-5 py-3 rounded-lg'
//           >
//             Create Job
//           </button>

//           {message && <p className='text-[#10B981]'>{message}</p>}
//         </div>
//       </div>
//     </div>
//   )
// }

// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import axios from '@/util/axios'
// import useEmployerGuard from '@/hooks/useEmployerGuard'

// export default function NewJobPage() {
//   useEmployerGuard()
//   const router = useRouter()
//   const [title, setTitle] = useState('')
//   const [description, setDescription] = useState('')
//   const [message, setMessage] = useState('')
//   const [error, setError] = useState('')
//   const [loading, setLoading] = useState(false)

//   const handleLogout = () => {
//     localStorage.removeItem('token')
//     localStorage.removeItem('role')
//     localStorage.removeItem('user')
//     router.push('/')
//   }

//   const submit = async () => {
//     if (!title.trim() || !description.trim()) {
//       setError('Please fill in all fields')
//       return
//     }
//     setError('')
//     setMessage('')
//     setLoading(true)
//     try {
//       await axios.post('/employer/jobs', { title, description })
//       setMessage('✅ Job created successfully!')
//       setTimeout(() => router.push('/employer/dashboard'), 1200)
//     } catch (e: any) {
//       setError(e.response?.data?.message || 'Error creating job')
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className='min-h-screen bg-gray-50'>
//       {/* Header */}
//       <div className='border-b bg-white shadow-sm'>
//         <div className='max-w-4xl mx-auto px-4 py-5 flex justify-between items-center'>
//           <h1 className='text-2xl font-bold text-[#1E40AF]'>Post a Job</h1>
//           <button
//             onClick={handleLogout}
//             className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm transition'
//           >
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Form */}
//       <div className='max-w-2xl mx-auto px-4 py-10'>
//         <div className='bg-white shadow rounded-2xl p-6 space-y-6'>
//           <div>
//             <label className='block text-sm font-medium text-gray-700'>
//               Title
//             </label>
//             <input
//               className='mt-1 w-full rounded-lg border p-3 focus:ring-2 focus:ring-[#1E40AF] outline-none'
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder='e.g., Frontend Developer'
//             />
//           </div>

//           <div>
//             <label className='block text-sm font-medium text-gray-700'>
//               Description
//             </label>
//             <textarea
//               className='mt-1 w-full rounded-lg border p-3 h-40 focus:ring-2 focus:ring-[#1E40AF] outline-none'
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//               placeholder='Role description, responsibilities, requirements...'
//             />
//           </div>

//           <button
//             onClick={submit}
//             disabled={loading}
//             className={`px-5 py-3 rounded-lg text-white shadow-sm transition ${
//               loading
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-[#10B981] hover:bg-[#0ea373]'
//             }`}
//           >
//             {loading ? 'Creating...' : 'Create Job'}
//           </button>

//           {error && <p className='text-red-600'>{error}</p>}
//           {message && <p className='text-green-600'>{message}</p>}
//         </div>
//       </div>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/util/axios'
import useEmployerGuard from '@/hooks/useEmployerGuard'

export default function NewJobPage() {
  useEmployerGuard()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

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

  const submit = async () => {
    if (!title.trim() || !description.trim()) {
      setError('Please fill in all fields')
      return
    }
    setError('')
    setMessage('')
    setLoading(true)
    try {
      await axios.post('/employer/jobs', { title, description })
      setMessage('✅ Job created successfully!')
      setTimeout(() => router.push('/employer/dashboard'), 1200)
    } catch (e: unknown) {
      setError('Error creating job')
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

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
        className={`border-b shadow-sm ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'
        }`}
      >
        <div className='max-w-4xl mx-auto px-4 py-5 flex justify-between items-center'>
          <h1 className='text-2xl font-bold text-[#1E40AF]'>Post a Job</h1>
          <button
            onClick={handleLogout}
            className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-sm transition'
          >
            Logout
          </button>
        </div>
      </div>

      {/* Form */}
      <div className='max-w-2xl mx-auto px-4 py-10'>
        <div
          className={`shadow rounded-2xl p-6 space-y-6 ${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white'
          }`}
        >
          <div>
            <label className='block text-sm font-medium'>Title</label>
            <input
              className={`mt-1 w-full rounded-lg border p-3 focus:ring-2 outline-none ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                  : 'border-gray-300 focus:ring-[#1E40AF]'
              }`}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='e.g., Frontend Developer'
            />
          </div>

          <div>
            <label className='block text-sm font-medium'>Description</label>
            <textarea
              className={`mt-1 w-full rounded-lg border p-3 h-40 focus:ring-2 outline-none ${
                theme === 'dark'
                  ? 'bg-gray-700 text-white border-gray-600 focus:ring-blue-500'
                  : 'border-gray-300 focus:ring-[#1E40AF]'
              }`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Role description, responsibilities, requirements...'
            />
          </div>

          <button
            onClick={submit}
            disabled={loading}
            className={`px-5 py-3 rounded-lg text-white shadow-sm transition ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-[#10B981] hover:bg-[#0ea373]'
            }`}
          >
            {loading ? 'Creating...' : 'Create Job'}
          </button>

          {error && <p className='text-red-600'>{error}</p>}
          {message && <p className='text-green-600'>{message}</p>}
        </div>
      </div>
    </div>
  )
}
