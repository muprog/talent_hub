// 'use client'

// import { useSearchParams, useRouter } from 'next/navigation'
// import { useState } from 'react'
// import axios from '../../util/axios'
// import Input from '@/components/Input'
// import Button from '@/components/Button'

// export default function VerifyOtpPage() {
//   const searchParams = useSearchParams()
//   const userId = searchParams.get('userId') || ''
//   const [otp, setOtp] = useState('')
//   const [message, setMessage] = useState('')
//   const router = useRouter()
//   console.log(userId)
//   const handleVerify = async () => {
//     try {
//       const res = await axios.post('/verify-otp', { userId, otp })
//       setMessage(res.data.message)
//       router.push('/reset-password')
//     } catch (err: any) {
//       setMessage(err.response?.data?.message || 'Error')
//     }
//   }

//   return (
//     <div className='min-h-screen flex justify-center items-center bg-background'>
//       <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
//         <h1 className='text-2xl font-bold text-primary mb-6'>
//           OTP Verification
//         </h1>
//         <Input
//           label='Enter OTP'
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//         />
//         <Button
//           onClick={handleVerify}
//           title='Verify'
//           btnStyle=''
//           btnType='submit'
//         />
//         {message && <p className='mt-4 text-secondary'>{message}</p>}
//       </div>
//     </div>
//   )
// }

'use client'

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import axios from '../../util/axios'
import Input from '@/components/Input'
import Button from '@/components/Button'

export default function VerifyOtpPage() {
  const searchParams = useSearchParams()
  const userId = searchParams.get('userId') || ''
  const [otp, setOtp] = useState('')
  const [message, setMessage] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>('light') // theme state
  const router = useRouter()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) setTheme(savedTheme)
  }, [])

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
          className={
            theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
          }
        />
        <Button
          onClick={handleVerify}
          title='Verify'
          btnType='submit'
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
