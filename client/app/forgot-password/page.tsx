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

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from '../../util/axios'
import Input from '@/components/Input'
import Button from '@/components/Button'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleSubmit = async () => {
    try {
      const res = await axios.post('/forgot-password', { email })
      setMessage(res.data.message)

      // Redirect to verify-otp with userId
      setTimeout(() => {
        router.push(`/verify-otp?userId=${res.data.userId}`)
      }, 1500)
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error')
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-background'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold text-primary mb-6'>
          Forgot Password
        </h1>
        <Input
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button
          btnType='submit'
          title={'send'}
          btnStyle={'text-black'}
          onClick={handleSubmit}
        />
        {message && <p className='mt-4 text-secondary'>{message}</p>}
      </div>
    </div>
  )
}
