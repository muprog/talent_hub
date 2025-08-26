'use client'

import { useEffect, useState } from 'react'
import axios from '@/util/axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

type Job = {
  _id: string
  title: string
  description: string
  createdAt: string
}

export default function LandingPage() {
  const [jobs, setJobs] = useState<Job[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const router = useRouter()

  useEffect(() => {
    const t = localStorage.getItem('token')
    setToken(t)

    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) setTheme(savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  const fetchJobs = async () => {
    try {
      const { data } = await axios.get('/api/jobs')
      setJobs(data.jobs)
    } catch (err: unknown) {
      setError('Failed to load jobs')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchJobs()
  }, [])

  const handleApply = () => {
    if (!token) router.push('/login')
  }

  return (
    <div
      className={`${
        theme === 'dark'
          ? 'bg-gray-900 text-gray-100'
          : 'bg-gray-50 text-gray-900'
      } min-h-screen transition-colors duration-300`}
    >
      <header
        className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} shadow`}
      >
        <div className='container mx-auto flex justify-between items-center py-4 px-6'>
          <h1 className='text-2xl font-bold text-blue-600'>TalentHub</h1>
          <nav className='flex items-center gap-4'>
            {!token ? (
              <>
                <Link href='/login' className='hover:text-blue-400'>
                  Login
                </Link>
                <Link href='/register' className='hover:text-blue-400'>
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  localStorage.removeItem('token')
                  window.location.href = '/'
                }}
                className='bg-red-500 text-white px-4 py-2 rounded'
              >
                Logout
              </button>
            )}

            <button
              onClick={toggleTheme}
              className='ml-2 px-3 py-1 rounded border border-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition'
            >
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>
          </nav>
        </div>
      </header>

      <section className='text-center py-20 px-6 bg-gradient-to-r from-blue-400 to-indigo-600 text-white'>
        <h2 className='text-4xl font-bold mb-4'>
          TalentHub: A Mini Job Portal
        </h2>
        <p className='mb-6 max-w-xl mx-auto'>
          Building a Platform for Job Seekers and Employers. Apply to jobs or
          post listings with ease.
        </p>
        <Link
          href='/'
          className='bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow hover:bg-gray-100 transition'
        >
          View Jobs
        </Link>
      </section>

      <section className='container mx-auto py-16 px-6'>
        <h3 className='text-3xl font-bold text-center mb-8'>Available Jobs</h3>

        {loading && <p className='text-center'>Loading jobs...</p>}
        {error && <p className='text-center text-red-600'>{error}</p>}

        <div className='space-y-6'>
          {jobs.map((job) => (
            <div
              key={job._id}
              className={`${
                theme === 'dark'
                  ? 'bg-gray-800 hover:bg-gray-700'
                  : 'bg-white hover:shadow-lg'
              } p-6 rounded shadow transition flex flex-col md:flex-row md:justify-between md:items-center`}
            >
              <div>
                <h4 className='text-xl font-semibold mb-2'>{job.title}</h4>
                <p
                  className={`${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  } mb-1`}
                >
                  {job.description}
                </p>
              </div>

              {!token && (
                <button
                  onClick={handleApply}
                  className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition mt-4 md:mt-0'
                >
                  Apply
                </button>
              )}
            </div>
          ))}
        </div>
      </section>

      <footer
        className={`${
          theme === 'dark'
            ? 'bg-gray-800 text-gray-400'
            : 'bg-white text-gray-500'
        } py-6 mt-16 text-center`}
      >
        &copy; {new Date().getFullYear()} TalentHub. All rights reserved.
      </footer>
    </div>
  )
}
