import express from 'express'
import { requireAuth, requireEmployer } from '../middleware/auth'
import Job from '../models/Job'
import Application from '../models/Application'
import { authMiddleware } from '../middleware/authMiddleware'
import { Request, Response } from 'express'
import { upload } from '../middleware/upload'
import mongoose from 'mongoose'
const {
  test,
  register,
  verifyOtp,
  login,
  forgotPassword,
  resetPassword,
  createApplication,
  getApplicationsByUser,
  getApplicationsByJob,
  getJobs,
  jobsRouter,
  applicationsRouter,
  usersRouter,
  getEmployerJob,
  deleteEmployerJob,
  getEmployerApplication,
  postEmployerJob,

  getApiJob,
  postApplicationStatus,
} = require('../controller/controller')
const router = express.Router()
router.post('/', test)
router.post('/register', register)
router.post('/verify-otp', verifyOtp)
router.post('/verify-register', verifyOtp)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.post('/employer/jobs', requireAuth, requireEmployer, postEmployerJob)

router.get('/employer/jobs', requireAuth, requireEmployer, getEmployerJob)

router.delete(
  '/employer/jobs/:id',
  requireAuth,
  requireEmployer,
  deleteEmployerJob
)

router.get(
  '/employer/jobs/:id/applications',
  requireAuth,
  requireEmployer,
  getEmployerApplication
)

router.post(
  '/applications/',
  requireAuth,
  upload.single('resume'),
  createApplication
)

router.get('/applications/my', requireAuth, getApplicationsByUser)

router.get('/job/:jobId', requireAuth, getApplicationsByJob)
router.get('/jobs', requireAuth, getJobs)
router.get('/api/jobs', getApiJob)
router.post(
  '/applications/:id/status',
  requireAuth,
  requireEmployer,
  postApplicationStatus
)
router.get('/admin/jobs', jobsRouter)
router.get('/admin/applications', applicationsRouter)
router.get('/admin/users', usersRouter)

export default router
