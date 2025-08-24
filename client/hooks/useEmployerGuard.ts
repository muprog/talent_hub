'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function useEmployerGuard() {
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (!token || (role !== 'employer' && role !== 'admin')) {
      router.replace('/login')
    }
  }, [router])
}
