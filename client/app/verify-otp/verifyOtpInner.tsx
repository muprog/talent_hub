'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import api from '../../util/axios'
import Input from '@/components/Input'
import Button from '@/components/Button'
import axios, { AxiosError } from 'axios'
export default function VerifyOtpInner() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || ''
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) setTheme(savedTheme)
  }, [])

  const handleVerify = async () => {
    setLoading(true)
    try {
      const res = await api.post('/verify-otp', { userId, otp })
      setMessage(res.data.message)
      router.push('/reset-password')
    } catch (err: unknown) {
      // setMessage('Error')
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
          OTP Verification
        </h1>
        <Input
          label='Enter OTP'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          disabled={loading}
          className={
            theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
          }
        />
        <Button
          onClick={handleVerify}
          title={loading ? 'Loading...' : 'Verify'}
          btnType='submit'
          disabled={loading}
          btnStyle={`rounded py-2 px-4 w-full mt-4 ${
            theme === 'dark'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-primary text-black hover:bg-blue-800'
          }`}
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
