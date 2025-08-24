'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from '@/util/axios'
import useEmployerGuard from '@/hooks/useEmployerGuard'
import { useRouter } from 'next/navigation'
type AppItem = {
  _id: string
  status: string
  userId: { _id: string; name: string; email: string }
}

export default function JobApplicationsPage() {
  useEmployerGuard()
  const params = useParams() as { id: string }
  const [apps, setApps] = useState<AppItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const router = useRouter()
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

  useEffect(() => {
    load()
  }, [])

  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-4xl mx-auto px-4 py-8 flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-[#1E40AF]'>Applications</h1>
        <button
          onClick={handleLogout}
          className='bg-red-500 text-white px-4 py-2 rounded-lg'
        >
          Logout
        </button>
      </div>

      <div className='max-w-4xl mx-auto px-4 py-8'>
        {/* <h1 className='text-2xl font-bold text-[#1E40AF]'>Applications</h1> */}
        {loading && <p>Loading...</p>}
        {error && <p className='text-red-600'>{error}</p>}

        <div className='mt-6 space-y-4'>
          {apps.map((a) => (
            <div key={a._id} className='border rounded-xl p-4'>
              <div className='font-medium'>{a.userId?.name}</div>
              <div className='text-gray-600'>{a.userId?.email}</div>
              <div className='mt-2 text-sm'>
                Status: <span className='font-semibold'>{a.status}</span>
              </div>
            </div>
          ))}
          {!loading && apps.length === 0 && (
            <p className='text-gray-500'>No applications yet.</p>
          )}
        </div>
      </div>
    </div>
  )
}
