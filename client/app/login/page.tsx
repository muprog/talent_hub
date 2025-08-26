// 'use client'
// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import { useRouter } from 'next/navigation'
// import axios from '../../util/axios'
// import Input from '@/components/Input'
// import Button from '@/components/Button'

// interface LoginData {
//   email: string
//   password: string
// }

// export default function LoginPage() {
//   const { register, handleSubmit } = useForm<LoginData>()
//   const [message, setMessage] = useState('')
//   const router = useRouter()

//   const onSubmit = async (data: LoginData) => {
//     try {
//       const res = await axios.post('/login', data)
//       localStorage.setItem('token', res.data.token)
//       localStorage.setItem('role', res.data.user.role)
//       localStorage.setItem('user', JSON.stringify(res.data.user))
//       console.log(res.data.token)
//       setMessage('Login successful!')
//       if (res.data.user.role == 'employer') {
//         router.push('/employer/dashboard')
//       } else if (res.data.user.role == 'applicant') {
//         router.push('/applicant/dashboard')
//       }
//     } catch (err: any) {
//       setMessage(err.response?.data?.message || 'Error')
//     }
//   }

//   return (
//     <div className='min-h-screen flex justify-center items-center bg-background'>
//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className='bg-white p-8 rounded shadow-md w-full max-w-md'
//       >
//         <h1 className='text-2xl font-bold text-primary mb-6'>Login</h1>
//         <Input label='Email' type='email' {...register('email')} required />
//         <Input
//           label='Password'
//           type='password'
//           {...register('password')}
//           required
//         />
//         <Button
//           btnType='submit'
//           title={'login'}
//           btnStyle={
//             'bg-primary text-black rounded py-2 px-4 w-full hover:bg-blue-800'
//           }
//         />
//         {message && <p className='mt-4 text-secondary'>{message}</p>}
//         <div className='flex justify-end mb-4'>
//           <a
//             href='/forgot-password'
//             className='text-sm text-primary hover:underline'
//           >
//             Forgot password?
//           </a>
//         </div>
//       </form>
//     </div>
//   )
// }

// 'use client'
// import { useState, useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import { useRouter } from 'next/navigation'
// import axios from '../../util/axios'
// import Input from '@/components/Input'
// import Button from '@/components/Button'

// interface LoginData {
//   email: string
//   password: string
// }

// export default function LoginPage() {
//   const { register, handleSubmit } = useForm<LoginData>()
//   const [message, setMessage] = useState('')
//   const [theme, setTheme] = useState<'light' | 'dark'>('light') // theme state
//   const router = useRouter()

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
//     if (savedTheme) setTheme(savedTheme)
//   }, [])

//   const onSubmit = async (data: LoginData) => {
//     try {
//       const res = await axios.post('/login', data)
//       localStorage.setItem('token', res.data.token)
//       localStorage.setItem('role', res.data.user.role)
//       localStorage.setItem('user', JSON.stringify(res.data.user))
//       setMessage('Login successful!')
//       if (res.data.user.role === 'employer') {
//         router.push('/employer/dashboard')
//       } else if (res.data.user.role === 'applicant') {
//         router.push('/applicant/dashboard')
//       }
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
//       <form
//         onSubmit={handleSubmit(onSubmit)}
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
//           Login
//         </h1>
//         <Input
//           label='Email'
//           type='email'
//           {...register('email')}
//           required
//           className={
//             theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
//           }
//         />
//         <Input
//           label='Password'
//           type='password'
//           {...register('password')}
//           required
//           className={
//             theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
//           }
//         />

//         <Button
//           btnType='submit'
//           title='login'
//           btnStyle={`rounded py-2 px-4 w-full ${
//             theme === 'dark'
//               ? 'bg-blue-600 text-white hover:bg-blue-700'
//               : 'bg-primary text-black hover:bg-blue-800'
//           }`}
//         />

//         {/* Register link */}
//         <div className='flex justify-center mt-4'>
//           <a
//             href='/register'
//             className={`text-sm hover:underline ${
//               theme === 'dark' ? 'text-blue-200' : 'text-primary'
//             }`}
//           >
//             Don't have an account? Register
//           </a>
//         </div>

//         {message && (
//           <p
//             className={
//               theme === 'dark' ? 'mt-4 text-blue-200' : 'mt-4 text-secondary'
//             }
//           >
//             {message}
//           </p>
//         )}

//         <div className='flex justify-end mb-4'>
//           <a
//             href='/forgot-password'
//             className={`text-sm hover:underline ${
//               theme === 'dark' ? 'text-blue-200' : 'text-primary'
//             }`}
//           >
//             Forgot password?
//           </a>
//         </div>
//       </form>
//     </div>
//   )
// }

'use client'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import axios from '../../util/axios'
import Input from '@/components/Input'
import Button from '@/components/Button'

interface LoginData {
  email: string
  password: string
}

export default function LoginPage() {
  const { register, handleSubmit } = useForm<LoginData>()
  const [message, setMessage] = useState('')
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [loading, setLoading] = useState(false) // ✅ loading state
  const router = useRouter()

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    if (savedTheme) setTheme(savedTheme)
  }, [])

  const onSubmit = async (data: LoginData) => {
    setLoading(true) // ✅ start loading
    try {
      const res = await axios.post('/login', data)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.user.role)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      setMessage('Login successful!')
      if (res.data.user.role === 'employer') {
        router.push('/employer/dashboard')
      } else if (res.data.user.role === 'applicant') {
        router.push('/applicant/dashboard')
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error')
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
          Login
        </h1>
        <Input
          label='Email'
          type='email'
          {...register('email')}
          required
          disabled={loading} // ✅ disable input
          className={
            theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
          }
        />
        <Input
          label='Password'
          type='password'
          {...register('password')}
          required
          disabled={loading} // ✅ disable input
          className={
            theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
          }
        />

        <Button
          btnType='submit'
          title={loading ? 'Loading...' : 'Login'} // ✅ show loading text
          btnStyle={`rounded py-2 px-4 w-full ${
            theme === 'dark'
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-primary text-black hover:bg-blue-800'
          }`}
          disabled={loading} // ✅ disable button
        />

        {/* Register link */}
        <div className='flex justify-center mt-4'>
          <a
            href='/register'
            className={`text-sm hover:underline ${
              theme === 'dark' ? 'text-blue-200' : 'text-primary'
            }`}
          >
            Don't have an account? Register
          </a>
        </div>

        {message && (
          <p
            className={
              theme === 'dark' ? 'mt-4 text-blue-200' : 'mt-4 text-secondary'
            }
          >
            {message}
          </p>
        )}

        <div className='flex justify-end mb-4'>
          <a
            href='/forgot-password'
            className={`text-sm hover:underline ${
              theme === 'dark' ? 'text-blue-200' : 'text-primary'
            }`}
          >
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  )
}
