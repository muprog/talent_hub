'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from '@/util/axios'
import useEmployerGuard from '@/hooks/useEmployerGuard'

export default function NewJobPage() {
  useEmployerGuard()
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [message, setMessage] = useState('')

  const submit = async () => {
    try {
      const { data } = await axios.post('/employer/jobs', {
        title,
        description,
      })
      setMessage('Job created')
      setTimeout(() => router.push('/employer/dashboard'), 800)
    } catch (e: any) {
      setMessage(e.response?.data?.message || 'Error')
    }
  }

  return (
    <div className='min-h-screen bg-white'>
      <div className='max-w-2xl mx-auto px-4 py-10'>
        <h1 className='text-2xl font-bold text-[#1E40AF]'>Post a Job</h1>

        <div className='mt-6 space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Title
            </label>
            <input
              className='mt-1 w-full rounded-lg border p-3'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='e.g., Frontend Developer'
            />
          </div>

          <div>
            <label className='block text-sm font-medium text-gray-700'>
              Description
            </label>
            <textarea
              className='mt-1 w-full rounded-lg border p-3 h-40'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Role description, responsibilities, requirements...'
            />
          </div>

          <button
            onClick={submit}
            className='bg-[#10B981] text-white px-5 py-3 rounded-lg'
          >
            Create Job
          </button>

          {message && <p className='text-[#10B981]'>{message}</p>}
        </div>
      </div>
    </div>
  )
}
