// 'use client'

// import { useState } from 'react'
// import { useForm } from 'react-hook-form'
// import axios from '../../util/axios'
// import { useRouter } from 'next/navigation'
// import Input from '@/components/Input'
// import Button from '@/components/Button'

// interface FormData {
//   name: string
//   email: string
//   password: string
//   role: 'employer' | 'applicant'
// }

// export default function RegisterPage() {
//   const { register, handleSubmit } = useForm<FormData>()
//   const [message, setMessage] = useState('')
//   const router = useRouter()

//   const onSubmit = async (data: FormData) => {
//     try {
//       const res = await axios.post('/register', data)
//       setMessage(res.data.message)
//       router.push(`/verify-register?userId=${res.data.userId}`)
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
//         <h1 className='text-2xl font-bold text-primary mb-6'>Register</h1>
//         <Input label='Name' {...register('name')} required />
//         <Input label='Email' type='email' {...register('email')} required />
//         <Input
//           label='Password'
//           type='password'
//           {...register('password')}
//           required
//         />
//         <div className='mb-4'>
//           <label className='block mb-1 font-semibold text-primary'>Role</label>
//           <select {...register('role')} className='border p-2 rounded w-full'>
//             <option value='applicant'>Applicant</option>
//             <option value='employer'>Employer</option>
//           </select>
//         </div>
//         <Button
//           btnType='submit'
//           title={'sign up'}
//           btnStyle={
//             'bg-primary text-black rounded hover:bg-blue-800 w-full py-2'
//           }
//         />
//         {message && <p className='mt-4 text-secondary'>{message}</p>}
//       </form>
//     </div>
//   )
// }

// 'use client'

// import { useState, useEffect } from 'react'
// import { useForm } from 'react-hook-form'
// import axios from '../../util/axios'
// import { useRouter } from 'next/navigation'
// import Input from '@/components/Input'
// import Button from '@/components/Button'

// interface FormData {
//   name: string
//   email: string
//   password: string
//   role: 'employer' | 'applicant'
// }

// export default function RegisterPage() {
//   const { register, handleSubmit } = useForm<FormData>()
//   const [message, setMessage] = useState('')
//   const [theme, setTheme] = useState<'light' | 'dark'>('light')
//   const router = useRouter()

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
//     if (savedTheme) setTheme(savedTheme)
//   }, [])

//   const onSubmit = async (data: FormData) => {
//     try {
//       const res = await axios.post('/register', data)
//       setMessage(res.data.message)
//       router.push(`/verify-register?userId=${res.data.userId}`)
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
//           Register
//         </h1>

//         <Input
//           label='Name'
//           {...register('name')}
//           required
//           className={
//             theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
//           }
//         />
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

//         <div className='mb-4'>
//           <label
//             className={`block mb-1 font-semibold ${
//               theme === 'dark' ? 'text-white' : 'text-primary'
//             }`}
//           >
//             Role
//           </label>
//           <select
//             {...register('role')}
//             className={`border p-2 rounded w-full ${
//               theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
//             }`}
//           >
//             <option value='applicant'>Applicant</option>
//             <option value='employer'>Employer</option>
//           </select>
//         </div>

//         <Button
//           btnType='submit'
//           title='sign up'
//           btnStyle={`rounded w-full py-2 ${
//             theme === 'dark'
//               ? 'bg-blue-600 text-white hover:bg-blue-700'
//               : 'bg-primary text-black hover:bg-blue-800'
//           }`}
//         />

//         {message && (
//           <p
//             className={
//               theme === 'dark' ? 'mt-4 text-blue-200' : 'mt-4 text-secondary'
//             }
//           >
//             {message}
//           </p>
//         )}
//         <div className='mt-4 text-sm text-center'>
//           <span
//             className={theme === 'dark' ? 'text-blue-200' : 'text-secondary'}
//           >
//             Already have an account?{' '}
//           </span>
//           <a
//             href='/login'
//             className={`font-semibold hover:underline ${
//               theme === 'dark' ? 'text-blue-400' : 'text-primary'
//             }`}
//           >
//             Login
//           </a>
//         </div>
//       </form>
//     </div>
//   )
// }

'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import axios from '../../util/axios'
import { useRouter } from 'next/navigation'
import Input from '@/components/Input'
import Button from '@/components/Button'

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
    setLoading(true) // ✅ start loading
    try {
      const res = await axios.post('/register', data)
      setMessage(res.data.message)
      router.push(`/verify-register?userId=${res.data.userId}`)
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
          disabled={loading} // ✅ disable when loading
          className={
            theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
          }
        />
        <Input
          label='Email'
          type='email'
          {...register('email')}
          required
          disabled={loading} // ✅ disable when loading
          className={
            theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : ''
          }
        />
        <Input
          label='Password'
          type='password'
          {...register('password')}
          required
          disabled={loading} // ✅ disable when loading
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
            disabled={loading} // ✅ disable when loading
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
          disabled={loading} // ✅ disable button
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
