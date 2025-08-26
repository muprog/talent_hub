// 'use client'

// import { useState } from 'react'
// import axios from '../../util/axios'
// import Input from '@/components/Input'
// import Button from '@/components/Button'

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState('')
//   const [message, setMessage] = useState('')

//   const handleSubmit = async () => {
//     try {
//       const res = await axios.post('/forgot-password', { email })
//       setMessage(res.data.message)
//     } catch (err: any) {
//       setMessage(err.response?.data?.message || 'Error')
//     }
//   }

//   return (
//     <div className='min-h-screen flex justify-center items-center bg-background'>
//       <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
//         <h1 className='text-2xl font-bold text-primary mb-6'>
//           Forgot Password
//         </h1>
//         <Input
//           label='Email'
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         {/* <Button onClick={handleSubmit}>Send OTP</Button> */}
//         <Button
//           btnType='submit'
//           title={'send'}
//           btnStyle={'text-black'}
//           onClick={handleSubmit}
//         />
//         {message && <p className='mt-4 text-secondary'>{message}</p>}
//       </div>
//     </div>
//   )
// }

// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import axios from '../../util/axios'
// import Input from '@/components/Input'
// import Button from '@/components/Button'

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState('')
//   const [message, setMessage] = useState('')
//   const router = useRouter()

//   const handleSubmit = async () => {
//     try {
//       const res = await axios.post('/forgot-password', { email })
//       setMessage(res.data.message)

//       // Redirect to verify-otp with userId
//       setTimeout(() => {
//         router.push(`/verify-otp?userId=${res.data.userId}`)
//       }, 1500)
//     } catch (err: any) {
//       setMessage(err.response?.data?.message || 'Error')
//     }
//   }

//   return (
//     <div className='min-h-screen flex justify-center items-center bg-background'>
//       <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
//         <h1 className='text-2xl font-bold text-primary mb-6'>
//           Forgot Password
//         </h1>
//         <Input
//           label='Email'
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <Button
//           btnType='submit'
//           title={'send'}
//           btnStyle={'text-black'}
//           onClick={handleSubmit}
//         />
//         {message && <p className='mt-4 text-secondary'>{message}</p>}
//       </div>
//     </div>
//   )
// }

// 'use client'

// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/navigation'
// import axios from '../../util/axios'
// import Input from '@/components/Input'
// import Button from '@/components/Button'

// export default function ForgotPasswordPage() {
//   const [email, setEmail] = useState('')
//   const [message, setMessage] = useState('')
//   const [theme, setTheme] = useState<'light' | 'dark'>('light') // theme state
//   const router = useRouter()

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
//     if (savedTheme) setTheme(savedTheme)
//   }, [])

//   const handleSubmit = async () => {
//     try {
//       const res = await axios.post('/forgot-password', { email })
//       setMessage(res.data.message)

//       // Redirect to verify-otp with userId
//       setTimeout(() => {
//         router.push(`/verify-otp?userId=${res.data.userId}`)
//       }, 1500)
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
//           Forgot Password
//         </h1>
//         <Input
//           label='Email'
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className={
//             theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
//           }
//         />
//         <Button
//           btnType='submit'
//           title='Send'
//           btnStyle={`rounded py-2 px-4 w-full mt-4 ${
//             theme === 'dark'
//               ? 'bg-blue-600 text-white hover:bg-blue-700'
//               : 'bg-primary text-black hover:bg-blue-800'
//           }`}
//           onClick={handleSubmit}
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

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from '../../util/axios'
import Input from '@/components/Input'
import Button from '@/components/Button'

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
    setLoading(true) // ✅ start loading
    try {
      const res = await axios.post('/forgot-password', { email })
      setMessage(res.data.message)

      // Redirect to verify-otp with userId
      setTimeout(() => {
        router.push(`/verify-otp?userId=${res.data.userId}`)
      }, 1500)
    } catch (err: unknown) {
      setMessage('Error')
      console.log(err)
    } finally {
      setLoading(false) // ✅ stop loading
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
          disabled={loading} // ✅ disable while loading
          className={
            theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
          }
        />
        <Button
          btnType='submit'
          title={loading ? 'Loading...' : 'Send'} // ✅ dynamic button text
          btnStyle={`rounded py-2 px-4 w-full mt-4 ${
            theme === 'dark'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-primary text-black hover:bg-blue-800'
          }`}
          onClick={handleSubmit}
          disabled={loading} // ✅ disable button
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
