'use client'
import { useState } from 'react'
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
  const router = useRouter()

  const onSubmit = async (data: LoginData) => {
    try {
      const res = await axios.post('/login', data)
      localStorage.setItem('token', res.data.token)
      localStorage.setItem('role', res.data.user.role)
      localStorage.setItem('user', JSON.stringify(res.data.user))
      console.log(res.data.token)
      setMessage('Login successful!')
      if (res.data.user.role == 'employer') {
        router.push('/employer/dashboard')
      } else if (res.data.user.role == 'applicant') {
        router.push('/applicant/dashboard')
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error')
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-background'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white p-8 rounded shadow-md w-full max-w-md'
      >
        <h1 className='text-2xl font-bold text-primary mb-6'>Login</h1>
        <Input label='Email' type='email' {...register('email')} required />
        <Input
          label='Password'
          type='password'
          {...register('password')}
          required
        />
        <Button
          btnType='submit'
          title={'login'}
          btnStyle={
            'bg-primary text-black rounded py-2 px-4 w-full hover:bg-blue-800'
          }
        />
        {message && <p className='mt-4 text-secondary'>{message}</p>}
        <div className='flex justify-end mb-4'>
          <a
            href='/forgot-password'
            className='text-sm text-primary hover:underline'
          >
            Forgot password?
          </a>
        </div>
      </form>
    </div>
  )
}
