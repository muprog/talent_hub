'use client'

import { Suspense } from 'react'
import VerifyRegisterInner from './VerifyRegisterInner'

export default function VerifyRegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyRegisterInner />
    </Suspense>
  )
}
