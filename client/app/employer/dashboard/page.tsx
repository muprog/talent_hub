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
  const router = useRouter()
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
    } catch (e: any) {
      setError(e.response?.data?.message || 'Failed to load jobs')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this job?')) return
    try {
      await axios.delete(`/employer/jobs/${id}`)
      setJobs((prev) => prev.filter((j) => j._id !== id))
    } catch (e: any) {
      alert(e.response?.data?.message || 'Delete failed')
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  return (
    <div className='min-h-screen bg-white'>
      <header className='border-b'>
        <div className='max-w-5xl mx-auto px-4 py-4 flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-[#1E40AF]'>
            TalentHub — Employer
          </h1>
          <Link
            href='/employer/jobs/new'
            className='bg-[#10B981] text-white px-4 py-2 rounded-lg'
          >
            + Post Job
          </Link>
          <button
            onClick={handleLogout}
            className='bg-red-500 text-white px-4 py-2 rounded-lg'
          >
            Logout
          </button>
        </div>
      </header>

      <main className='max-w-5xl mx-auto px-4 py-8'>
        <h2 className='text-xl font-semibold mb-4'>My Jobs</h2>

        {loading && <p>Loading...</p>}
        {error && <p className='text-red-600'>{error}</p>}

        <div className='grid md:grid-cols-2 gap-6'>
          {jobs.map((job) => (
            <div key={job._id} className='rounded-2xl shadow p-5 border'>
              <h3 className='text-lg font-semibold'>{job.title}</h3>
              <p className='text-gray-600 mt-2 line-clamp-3'>
                {job.description}
              </p>

              <div className='flex gap-3 mt-4'>
                <Link
                  href={`/employer/jobs/${job._id}/applications`}
                  className='px-3 py-2 rounded-lg border text-[#1E40AF]'
                >
                  View Applications
                </Link>
                <button
                  onClick={() => handleDelete(job._id)}
                  className='px-3 py-2 rounded-lg border text-red-600'
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {!loading && jobs.length === 0 && (
          <p className='text-gray-500 mt-6'>
            No jobs yet. Post your first role!
          </p>
        )}
      </main>
    </div>
  )
}
