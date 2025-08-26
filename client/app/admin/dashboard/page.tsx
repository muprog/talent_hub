'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/util/axios'

interface Job {
  _id: string
  title: string
  createdBy: string
}
interface Application {
  _id: string
  jobTitle: string
  applicantName: string
  status: string
}
interface User {
  _id: string
  name: string
  email: string
  role: string
}

export default function AdminPanel() {
  // const { theme } = useTheme() // ✅ gets synced global theme
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'jobs' | 'applications' | 'users'
  >('dashboard')

  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // ✅ Authentication guard
  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (!token || role !== 'admin') {
      router.push('/login')
    } else {
      setLoading(false)
    }
  }, [router])
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) setTheme(savedTheme)
  }, [])

  // Fetch jobs
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await api.get('/admin/jobs')
        setJobs(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchJobs()
  }, [])

  // Fetch applications
  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await api.get('/admin/applications')
        setApplications(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchApplications()
  }, [])

  // Fetch users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get('/admin/users')
        setUsers(res.data)
      } catch (err) {
        console.error(err)
      }
    }
    fetchUsers()
  }, [])

  const tabStyle = (tab: string) =>
    `px-4 py-2 cursor-pointer rounded hover:bg-blue-100 dark:hover:bg-gray-700 ${
      activeTab === tab ? 'bg-blue-100 dark:bg-gray-700 font-semibold' : ''
    }`

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('role')
    localStorage.removeItem('user')
    router.push('/')
  }

  // Loader
  if (loading) {
    return (
      <div
        className={`${
          theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'
        } min-h-screen flex items-center justify-center`}
      >
        <p className='text-xl'>Checking authentication...</p>
      </div>
    )
  }

  return (
    <div
      className={`${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'
      } min-h-screen`}
    >
      <div className='flex flex-col md:flex-row'>
        {/* Sidebar */}
        <aside
          className={`${
            theme === 'dark' ? 'bg-gray-800' : 'bg-white shadow'
          } w-64 p-4 flex flex-col justify-between`}
        >
          <div>
            <h2 className='text-2xl font-bold mb-6 border-b pb-2'>
              TalentHub Admin
            </h2>
            <nav className='flex flex-col gap-2'>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={tabStyle('dashboard')}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveTab('jobs')}
                className={tabStyle('jobs')}
              >
                Jobs
              </button>
              <button
                onClick={() => setActiveTab('applications')}
                className={tabStyle('applications')}
              >
                Applications
              </button>
              <button
                onClick={() => setActiveTab('users')}
                className={tabStyle('users')}
              >
                Users
              </button>
            </nav>
          </div>

          <button
            onClick={handleLogout}
            className='mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition'
          >
            Logout
          </button>
        </aside>

        {/* Content */}
        <main className='flex-1 p-6'>
          {activeTab === 'dashboard' && (
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='p-4 rounded shadow bg-white dark:bg-gray-800'>
                <h2 className='font-bold'>Total Jobs</h2>
                <p className='text-xl'>{jobs.length}</p>
              </div>
              <div className='p-4 rounded shadow bg-white dark:bg-gray-800'>
                <h2 className='font-bold'>Total Applications</h2>
                <p className='text-xl'>{applications.length}</p>
              </div>
              <div className='p-4 rounded shadow bg-white dark:bg-gray-800'>
                <h2 className='font-bold'>Total Users</h2>
                <p className='text-xl'>{users.length}</p>
              </div>
            </div>
          )}

          {activeTab === 'jobs' && (
            <ul className='space-y-2'>
              {jobs.map((job) => (
                <li
                  key={job._id}
                  className='p-3 bg-white dark:bg-gray-800 rounded shadow'
                >
                  {job.title} - {job.createdBy}
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'applications' && (
            <ul className='space-y-2'>
              {applications.map((app) => (
                <li
                  key={app._id}
                  className='p-3 bg-white dark:bg-gray-800 rounded shadow'
                >
                  {app.applicantName} applied for {app.jobTitle} - {app.status}
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'users' && (
            <ul className='space-y-2'>
              {users.map((user) => (
                <li
                  key={user._id}
                  className='p-3 bg-white dark:bg-gray-800 rounded shadow'
                >
                  {user.name} ({user.role}) - {user.email}
                </li>
              ))}
            </ul>
          )}
        </main>
      </div>
    </div>
  )
}
