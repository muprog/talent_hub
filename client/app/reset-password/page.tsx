// 'use client'

// import { useState } from 'react'
// import axios from '@/util/axios'
// import Input from '@/components/Input'
// import Button from '@/components/Button'

// export default function ResetPasswordPage() {
//   const [email, setEmail] = useState('')
//   const [otp, setOtp] = useState('')
//   const [newPassword, setNewPassword] = useState('')
//   const [message, setMessage] = useState('')

//   const handleReset = async () => {
//     try {
//       const res = await axios.post('/reset-password', {
//         email,
//         otp,
//         newPassword,
//       })
//       setMessage(res.data.message)
//     } catch (err: any) {
//       setMessage(err.response?.data?.message || 'Error')
//     }
//   }

//   return (
//     <div className='min-h-screen flex justify-center items-center bg-background'>
//       <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
//         <h1 className='text-2xl font-bold text-primary mb-6'>Reset Password</h1>
//         <Input
//           label='Email'
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <Input
//           label='OTP'
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//         />
//         <Input
//           label='New Password'
//           type='password'
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//         />
//         <Button
//           onClick={handleReset}
//           title='Reset Password'
//           btnStyle=''
//           btnType='submit'
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

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [message, setMessage] = useState('')
  const router = useRouter()

  const handleReset = async () => {
    try {
      const res = await axios.post('/reset-password', { email, newPassword })
      setMessage(res.data.message)

      // Redirect to login after a short delay
      setTimeout(() => router.push('/login'), 1500)
    } catch (err: any) {
      setMessage(err.response?.data?.message || 'Error')
    }
  }

  return (
    <div className='min-h-screen flex justify-center items-center bg-background'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h1 className='text-2xl font-bold text-primary mb-6'>Reset Password</h1>
        <Input
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          label='New Password'
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button
          onClick={handleReset}
          title='Reset Password'
          btnStyle='text-black'
          btnType='submit'
        />
        {message && <p className='mt-4 text-secondary'>{message}</p>}
      </div>
    </div>
  )
}
