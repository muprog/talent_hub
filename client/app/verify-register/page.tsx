// 'use client'

// import { useState } from 'react'
// import { useSearchParams, useRouter } from 'next/navigation'
// import axios from '../../util/axios'
// import Input from '@/components/Input'
// import Button from '@/components/Button'

// export default function VerifyRegisterPage() {
//   const searchParams = useSearchParams()
//   const userId = searchParams.get('userId') || ''
//   const [otp, setOtp] = useState('')
//   const [message, setMessage] = useState('')
//   const router = useRouter()

//   const handleVerify = async () => {
//     try {
//       const res = await axios.post('/verify-register', { userId, otp })
//       setMessage(res.data.message)
//       setTimeout(() => router.push('/login'), 1500) // Redirect to login
//     } catch (err: any) {
//       setMessage(err.response?.data?.message || 'Error')
//     }
//   }

//   return (
//     <div className='min-h-screen flex justify-center items-center bg-background'>
//       <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
//         <h1 className='text-2xl font-bold text-primary mb-6'>Verify Email</h1>
//         <Input
//           label='Enter OTP'
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//         />
//         <Button
//           btnType='submit'
//           title='Verify'
//           btnStyle='bg-primary text-black w-full py-2 rounded'
//           onClick={handleVerify}
//         />
//         {message && <p className='mt-4 text-secondary'>{message}</p>}
//       </div>
//     </div>
//   )
// }

// 'use client'

// import { useState, useEffect } from 'react'
// import { useSearchParams, useRouter } from 'next/navigation'
// import axios from '../../util/axios'
// import Input from '@/components/Input'
// import Button from '@/components/Button'

// export default function VerifyRegisterPage() {
//   const searchParams = useSearchParams()
//   const userId = searchParams.get('userId') || ''
//   const [otp, setOtp] = useState('')
//   const [message, setMessage] = useState('')
//   const [theme, setTheme] = useState<'light' | 'dark'>('light') // theme state
//   const router = useRouter()

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
//     if (savedTheme) setTheme(savedTheme)
//   }, [])

//   const handleVerify = async () => {
//     try {
//       const res = await axios.post('/verify-register', { userId, otp })
//       setMessage(res.data.message)
//       setTimeout(() => router.push('/login'), 1500) // Redirect to login
//     } catch (err: any) {
//       setMessage(err.response?.data?.message || 'Error')
//     }
//   }

//   return (
//     <div
//       className={`min-h-screen flex justify-center items-center ${
//         theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
//       }`}
//     >
//       <div
//         className={`p-8 rounded shadow-md w-full max-w-md ${
//           theme === 'dark'
//             ? 'bg-gray-800 text-gray-100'
//             : 'bg-white text-gray-900'
//         }`}
//       >
//         <h1
//           className={`text-2xl font-bold mb-6 ${
//             theme === 'dark' ? 'text-white' : 'text-primary'
//           }`}
//         >
//           Verify Email
//         </h1>
//         <Input
//           label='Enter OTP'
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           className={
//             theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
//           }
//         />
//         <Button
//           btnType='submit'
//           title='Verify'
//           onClick={handleVerify}
//           btnStyle={`w-full py-2 rounded mt-4 ${
//             theme === 'dark'
//               ? 'bg-blue-600 text-white hover:bg-blue-700'
//               : 'bg-primary text-black hover:bg-blue-800'
//           }`}
//         />
//         {message && (
//           <p
//             className={`mt-4 ${
//               theme === 'dark' ? 'text-blue-200' : 'text-secondary'
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }

// 'use client'

// import { useState, useEffect } from 'react'
// import { useSearchParams, useRouter } from 'next/navigation'
// import axios from '../../util/axios'
// import Input from '@/components/Input'
// import Button from '@/components/Button'

// export default function VerifyRegisterPage() {
//   const searchParams = useSearchParams()
//   const userId = searchParams.get('userId') || ''
//   const [otp, setOtp] = useState('')
//   const [message, setMessage] = useState('')
//   const [theme, setTheme] = useState<'light' | 'dark'>('light')
//   const [loading, setLoading] = useState(false) // ✅ loading state
//   const router = useRouter()

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
//     if (savedTheme) setTheme(savedTheme)
//   }, [])

//   const handleVerify = async () => {
//     setLoading(true) // ✅ start loading
//     try {
//       const res = await axios.post('/verify-register', { userId, otp })
//       setMessage(res.data.message)
//       setTimeout(() => router.push('/login'), 1500) // redirect
//     } catch (err: unknown) {
//       // setMessage(err.response?.data?.message || 'Error')
//       setMessage('Error')
//       console.log(err)
//     } finally {
//       setLoading(false) // ✅ stop loading
//     }
//   }

//   return (
//     <div
//       className={`min-h-screen flex justify-center items-center ${
//         theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'
//       }`}
//     >
//       <div
//         className={`p-8 rounded shadow-md w-full max-w-md ${
//           theme === 'dark'
//             ? 'bg-gray-800 text-gray-100'
//             : 'bg-white text-gray-900'
//         }`}
//       >
//         <h1
//           className={`text-2xl font-bold mb-6 ${
//             theme === 'dark' ? 'text-white' : 'text-primary'
//           }`}
//         >
//           Verify Email
//         </h1>
//         <Input
//           label='Enter OTP'
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           disabled={loading} // ✅ disable while loading
//           className={
//             theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
//           }
//         />
//         <Button
//           btnType='submit'
//           title={loading ? 'Loading...' : 'Verify'} // ✅ show loading text
//           onClick={handleVerify}
//           disabled={loading} // ✅ disable button
//           btnStyle={`w-full py-2 rounded mt-4 ${
//             theme === 'dark'
//               ? 'bg-blue-600 text-white hover:bg-blue-700'
//               : 'bg-primary text-black hover:bg-blue-800'
//           }`}
//         />
//         {message && (
//           <p
//             className={`mt-4 ${
//               theme === 'dark' ? 'text-blue-200' : 'text-secondary'
//             }`}
//           >
//             {message}
//           </p>
//         )}
//       </div>
//     </div>
//   )
// }

'use client'

import { Suspense } from 'react'
import VerifyRegisterInner from './VerifyRegisterInner'

export default function VerifyRegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyRegisterInner />
    </Suspense>
  )
}
