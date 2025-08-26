'use client'

import { useEffect, useState, useCallback } from 'react'
import axios from '@/util/axios'
import useApplicantGuard from '@/hooks/useApplicantGuard'

type Job = {
  _id: string
  title: string
  description: string
  createdAt: string
}

type Application = {
  _id: string
  jobId: Job | null
  status: string
}

export default function ApplicantDashboard() {
  useApplicantGuard()
  const [jobs, setJobs] = useState<Job[]>([])
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [token, setToken] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedTab, setSelectedTab] = useState<
    'All' | 'Shortlisted' | 'Rejected' | 'Accepted'
  >('All')
  const [searchApplications, setSearchApplications] = useState('')
  const [searchJobs, setSearchJobs] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  useEffect(() => {
    const t = localStorage.getItem('token')
    setToken(t)
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) setTheme(savedTheme)
  }, [])

  const fetchJobs = useCallback(async () => {
    try {
      const { data } = await axios.get('/jobs', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setJobs(data.jobs)
    } catch (err: unknown) {
      setError('Failed to load jobs')
      console.log(err)
    }
  }, [token])

  const fetchApplications = useCallback(async () => {
    try {
      const { data } = await axios.get('/applications/my', {
        headers: { Authorization: `Bearer ${token}` },
      })
      setApplications(data.applications)
    } catch (err: unknown) {
      setError('Failed to load applications')
      console.log(err)
    } finally {
      setLoading(false)
    }
  }, [token])

  const isApplied = (jobId: string) =>
    applications.some((app) => app.jobId?._id === jobId)

  const handleApply = async (jobId: string) => {
    if (!selectedFile) {
      alert('Please upload your resume (CV) before applying.')
      return
    }

    const formData = new FormData()
    formData.append('jobId', jobId)
    formData.append('resume', selectedFile)

    try {
      await axios.post('/applications', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      alert('Application submitted!')
      setSelectedFile(null)
      fetchApplications()
    } catch (err: unknown) {
      // alert(err.response?.data?.message || 'Failed to apply')
      alert('Failed to load ')
      console.log(err)
    }
  }

  useEffect(() => {
    if (token) {
      fetchJobs()
      fetchApplications()
    }
  }, [token, fetchJobs, fetchApplications])

  const filteredApplications = applications
    .filter((app) =>
      selectedTab === 'All'
        ? true
        : selectedTab === 'Shortlisted'
        ? app.status === 'shortlisted'
        : selectedTab === 'Rejected'
        ? app.status === 'rejected'
        : app.status === 'accepted'
    )
    .filter((app) =>
      app.jobId?.title.toLowerCase().includes(searchApplications.toLowerCase())
    )

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchJobs.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    const base = 'px-2 py-1 text-xs rounded-full font-medium'
    switch (status) {
      case 'shortlisted':
        return (
          <span className={`${base} bg-green-100 text-green-700`}>
            Shortlisted
          </span>
        )
      case 'rejected':
        return (
          <span className={`${base} bg-red-100 text-red-700`}>Rejected</span>
        )
      case 'accepted':
        return (
          <span className={`${base} bg-blue-100 text-blue-700`}>Accepted</span>
        )
      default:
        return (
          <span className={`${base} bg-gray-100 text-gray-700`}>Pending</span>
        )
    }
  }

  return (
    <div
      className={
        theme === 'dark'
          ? 'min-h-screen bg-gray-900'
          : 'min-h-screen bg-gray-50'
      }
    >
      <header
        className={`border-b shadow-sm ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
        }`}
      >
        <div className='max-w-5xl mx-auto px-4 py-4 flex items-center justify-between'>
          <h1 className='text-2xl font-bold text-[#1E40AF]'>
            TalentHub — Applicant
          </h1>
          <button
            onClick={() => {
              localStorage.removeItem('token')
              localStorage.removeItem('role')
              window.location.href = '/'
            }}
            className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition'
          >
            Logout
          </button>
        </div>
      </header>

      <main className='max-w-5xl mx-auto px-4 py-8'>
        <h2 className='text-xl font-semibold mb-4 text-[#1E40AF]'>
          Available Jobs
        </h2>

        <div className='mb-4'>
          <input
            type='text'
            placeholder='Search jobs by title...'
            value={searchJobs}
            onChange={(e) => setSearchJobs(e.target.value)}
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
        <div className='space-y-6 mb-10'>
          {filteredJobs.map((job) => (
            <div
              key={job._id}
              className={`rounded-2xl border shadow-sm hover:shadow-md transition p-6 ${
                theme === 'dark'
                  ? 'bg-gray-800 text-white border-gray-700'
                  : 'bg-white'
              }`}
            >
              <h3 className='text-lg font-semibold text-[#1E40AF]'>
                {job.title}
              </h3>
              <p className='mt-2 line-clamp-3'>{job.description}</p>

              {!isApplied(job._id) ? (
                <div className='mt-4 space-y-3'>
                  <label className='block'>
                    <span
                      className={
                        theme === 'dark' ? 'text-gray-200' : 'text-gray-700'
                      }
                    >
                      Upload Resume (CV)
                    </span>
                    <input
                      type='file'
                      accept='.pdf,.doc,.docx'
                      onChange={(e) =>
                        setSelectedFile(e.target.files?.[0] || null)
                      }
                      className={`mt-1 block w-full text-sm 
                        file:mr-3 file:py-2 file:px-4 
                        file:rounded-lg file:border-0 
                        file:text-sm file:font-semibold
                        hover:file:bg-blue-100
                        ${
                          theme === 'dark'
                            ? 'file:bg-blue-700 file:text-white'
                            : 'file:bg-blue-50 file:text-blue-700'
                        }`}
                    />
                  </label>
                  <button
                    onClick={() => handleApply(job._id)}
                    className='w-full bg-[#10B981] hover:bg-[#059669] text-white px-4 py-2 rounded-lg transition'
                  >
                    Apply
                  </button>
                </div>
              ) : (
                <button
                  disabled
                  className='mt-4 w-full bg-gray-400 text-white px-4 py-2 rounded-lg cursor-not-allowed'
                >
                  Applied
                </button>
              )}
            </div>
          ))}
        </div>

        <h2 className='text-xl font-semibold mb-4 text-[#1E40AF]'>
          My Applications
        </h2>

        <div className='mb-4'>
          <input
            type='text'
            placeholder='Search applications by job title...'
            value={searchApplications}
            onChange={(e) => setSearchApplications(e.target.value)}
            className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark'
                ? 'bg-gray-700 text-white border-gray-600'
                : 'border-gray-300 text-gray-900'
            }`}
          />
        </div>

        <div className='flex gap-4 mb-6'>
          {(['All', 'Shortlisted', 'Rejected', 'Accepted'] as const).map(
            (tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg transition ${
                  selectedTab === tab
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </button>
            )
          )}
        </div>

        <div className='space-y-4'>
          {filteredApplications.map((app) => (
            <div
              key={app._id}
              className={`border rounded-xl shadow-sm p-4 ${
                theme === 'dark'
                  ? 'bg-gray-800 text-white border-gray-700'
                  : 'bg-white'
              }`}
            >
              <div className='font-medium text-[#1E40AF]'>
                {app.jobId?.title || 'Job no longer accepting applications'}
              </div>
              <div className='mt-1'>{getStatusBadge(app.status)}</div>
            </div>
          ))}

          {!loading && filteredApplications.length === 0 && (
            <p
              className={
                theme === 'dark'
                  ? 'text-gray-200 italic'
                  : 'text-gray-500 italic'
              }
            >
              No applications yet.
            </p>
          )}
        </div>
      </main>
    </div>
  )
}
