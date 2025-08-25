'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function useApplicantGuard() {
  const router = useRouter()
  useEffect(() => {
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    if (!token || role !== 'applicant') {
      router.replace('/login')
    }
  }, [router])
}
