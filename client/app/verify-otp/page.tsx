'use client'

import { Suspense } from 'react'
import VerifyOtpInner from './verifyOtpInner'

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOtpInner />
    </Suspense>
  )
}
