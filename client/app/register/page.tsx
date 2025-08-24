'use client'

import { useState } from 'react'
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
  const router = useRouter()

  const onSubmit = async (data: FormData) => {
    try {
      const res = await axios.post('/register', data)
      setMessage(res.data.message)
      router.push(`/verify-register?userId=${res.data.userId}`)
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
        <h1 className='text-2xl font-bold text-primary mb-6'>Register</h1>
        <Input label='Name' {...register('name')} required />
        <Input label='Email' type='email' {...register('email')} required />
        <Input
          label='Password'
          type='password'
          {...register('password')}
          required
        />
        <div className='mb-4'>
          <label className='block mb-1 font-semibold text-primary'>Role</label>
          <select {...register('role')} className='border p-2 rounded w-full'>
            <option value='applicant'>Applicant</option>
            <option value='employer'>Employer</option>
          </select>
        </div>
        <Button
          btnType='submit'
          title={'sign up'}
          btnStyle={
            'bg-primary text-black rounded hover:bg-blue-800 w-full py-2'
          }
        />
        {message && <p className='mt-4 text-secondary'>{message}</p>}
      </form>
    </div>
  )
}
