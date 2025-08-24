'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import axios from '../../util/axios'
import Input from '@/components/Input'
import Button from '@/components/Button'

export default function VerifyRegisterPage() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || ''
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleVerify = async () => {
    try {
      const res = await axios.post('/verify-register', { userId, otp })
      setMessage(res.data.message)
      setTimeout(() => router.push('/login'), 1500) // Redirect to login
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error')
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-background'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold text-primary mb-6'>Verify Email</h1>
        <Input
          label='Enter OTP'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button
          btnType='submit'
          title='Verify'
          btnStyle='bg-primary text-black w-full py-2 rounded'
          onClick={handleVerify}
        />
        {message && <p className='mt-4 text-secondary'>{message}</p>}
      </div>
    </div>
  )
}
