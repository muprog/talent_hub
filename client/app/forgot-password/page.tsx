'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import api from '../../util/axios'
import Input from '@/components/Input'
import Button from '@/components/Button'
import axios from 'axios'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [loading, setLoading] = useState(false) // ✅ loading state
  const router = useRouter()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) setTheme(savedTheme)
  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await api.post('/forgot-password', { email })
      setMessage(res.data.message)

      setTimeout(() => {
        router.push(`/verify-otp?userId=${res.data.userId}`)
      }, 1500)
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
      <div
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
          Forgot Password
        </h1>
        <Input
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className={
            theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
          }
        />
        <Button
          btnType='submit'
          title={loading ? 'Loading...' : 'Send'}
          btnStyle={`rounded py-2 px-4 w-full mt-4 ${
            theme === 'dark'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-primary text-black hover:bg-blue-800'
          }`}
          onClick={handleSubmit}
          disabled={loading}
        />
        {message && (
          <p
            className={`mt-4 ${
              theme === 'dark' ? 'text-blue-200' : 'text-secondary'
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  )
}
