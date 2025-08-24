'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import axios from '../../util/axios'
import Input from '@/components/Input'
import Button from '@/components/Button'

export default function VerifyOtpPage() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || ''
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()
  console.log(userId)
  const handleVerify = async () => {
    try {
      const res = await axios.post('/verify-otp', { userId, otp })
      setMessage(res.data.message)
      router.push('/reset-password')
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error')
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-background'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold text-primary mb-6'>
          OTP Verification
        </h1>
        <Input
          label='Enter OTP'
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <Button
          onClick={handleVerify}
          title='Verify'
          btnStyle=''
          btnType='submit'
        />
        {message && <p className='mt-4 text-secondary'>{message}</p>}
      </div>
    </div>
  )
}
