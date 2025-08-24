// export default function Home() {
//   return <div className=''></div>
// }

'use client'

import React from 'react'
import Link from 'next/link'

const jobs = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'ABC Tech',
    location: 'Addis Ababa',
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'XYZ Solutions',
    location: 'Addis Ababa',
  },
  {
    id: 3,
    title: 'Fullstack Engineer',
    company: 'TalentHub Inc.',
    location: 'Remote',
  },
]

export default function LandingPage() {
  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Header */}
      <header className='bg-white shadow'>
        <div className='container mx-auto flex justify-between items-center py-4 px-6'>
          <h1 className='text-2xl font-bold text-primary'>TalentHub</h1>
          <nav>
            <Link
              href='/login'
              className='mr-4 text-gray-700 hover:text-primary'
            >
              Login
            </Link>
            <Link href='/register' className='text-gray-700 hover:text-primary'>
              Register
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className='text-center py-20 px-6 bg-gradient-to-r from-blue-400 to-indigo-600 text-white'>
        <h2 className='text-4xl font-bold mb-4'>
          TalentHub: A Mini Job Portal
        </h2>
        <p className='mb-6 max-w-xl mx-auto'>
          Building a Platform for Job Seekers and Employers. Apply to jobs or
          post listings with ease.
        </p>
        <Link
          href='/jobs'
          className='bg-white text-blue-600 font-semibold py-3 px-6 rounded shadow hover:bg-gray-100 transition'
        >
          View Jobs
        </Link>
      </section>

      {/* Job Listings */}
      <section className='container mx-auto py-16 px-6'>
        <h3 className='text-3xl font-bold text-center mb-8'>Available Jobs</h3>
        <div className='grid md:grid-cols-3 gap-6'>
          {jobs.map((job) => (
            <div
              key={job.id}
              className='bg-white p-6 rounded shadow hover:shadow-lg transition'
            >
              <h4 className='text-xl font-semibold mb-2'>{job.title}</h4>
              <p className='text-gray-600 mb-1'>{job.company}</p>
              <p className='text-gray-500 mb-4'>{job.location}</p>
              <Link
                href={`/jobs/${job.id}`}
                className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition'
              >
                Apply
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* About Section */}
      <section className='bg-gray-100 py-16 px-6'>
        <div className='max-w-3xl mx-auto text-center'>
          <h3 className='text-3xl font-bold mb-4'>🎯 Objective</h3>
          <p>
            TalentHub is designed to quickly showcase frontend, backend, and
            database skills. Companies can post jobs, developers can apply, and
            admins can review applications efficiently.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className='bg-white py-6 mt-16 text-center text-gray-500'>
        &copy; {new Date().getFullYear()} TalentHub. All rights reserved.
      </footer>
    </div>
  )
}
