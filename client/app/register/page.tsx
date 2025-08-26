'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import api from '../../util/axios'
import { useRouter } from 'next/navigation'
import Input from '@/components/Input'
import Button from '@/components/Button'
import axios, { AxiosError } from 'axios'

interface FormData {
  name: string
  email: string
  password: string
  role: 'employer' | 'applicant'
}

export default function RegisterPage() {
  const { register, handleSubmit } = useForm<FormData>()
  const [message, setMessage] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [loading, setLoading] = useState(false) // ✅ loading state
  const router = useRouter()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) setTheme(savedTheme)
  }, [])

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      const res = await api.post('/register', data)
      setMessage(res.data.message)
      router.push(`/verify-register?userId=${res.data.userId}`)
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const serverMsg = err.response?.data?.message
        setMessage(serverMsg || 'Login failed. Please try again.')
      } else {
        setMessage('Unexpected error occurred.')
      }
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className={`min-h-screen flex justify-center items-center ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
      }`}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`p-8 rounded shadow-md w-full max-w-md ${
          theme === 'dark'
            ? 'bg-gray-800 text-gray-100'
            : 'bg-white text-gray-900'
        }`}
      >
        <h1
          className={`text-2xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-primary'
          }`}
        >
          Register
        </h1>

        <Input
          label='Name'
          {...register('name')}
          required
          disabled={loading}
          className={
            theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
          }
        />
        <Input
          label='Email'
          type='email'
          {...register('email')}
          required
          disabled={loading}
          className={
            theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
          }
        />
        <Input
          label='Password'
          type='password'
          {...register('password')}
          required
          disabled={loading}
          className={
            theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
          }
        />

        <div className='mb-4'>
          <label
            className={`block mb-1 font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-primary'
            }`}
          >
            Role
          </label>
          <select
            {...register('role')}
            disabled={loading}
            className={`border p-2 rounded w-full ${
              theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
            }`}
          >
            <option value='applicant'>Applicant</option>
            <option value='employer'>Employer</option>
          </select>
        </div>

        <Button
          btnType='submit'
          title={loading ? 'Loading...' : 'Sign Up'} // ✅ change text
          btnStyle={`rounded w-full py-2 ${
            theme === 'dark'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-primary text-black hover:bg-blue-800'
          }`}
          disabled={loading}
        />

        {message && (
          <p
            className={
              theme === 'dark' ? 'mt-4 text-blue-200' : 'mt-4 text-secondary'
            }
          >
            {message}
          </p>
        )}
        <div className='mt-4 text-sm text-center'>
          <span
            className={theme === 'dark' ? 'text-blue-200' : 'text-secondary'}
          >
            Already have an account?{' '}
          </span>
          <a
            href='/login'
            className={`font-semibold hover:underline ${
              theme === 'dark' ? 'text-blue-400' : 'text-primary'
            }`}
          >
            Login
          </a>
        </div>
      </form>
    </div>
  )
}
