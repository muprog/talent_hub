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
  verifyRegister,
  createApplication,
  getApplicationsByUser,
  getApplicationsByJob,
  getAllJobs,
  getJobs,
} = require('../controller/controller')
const router = express.Router()
router.post('/', test)
router.post('/register', register)
router.post('/verify-otp', verifyOtp)
router.post('/verify-register', verifyOtp)
router.post('/login', login)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password', resetPassword)
router.post(
  '/employer/jobs',
  requireAuth,
  requireEmployer,
  async (req: Request, res: Response) => {
    try {
      const { title, description } = req.body
      if (!title || !description)
        return res
          .status(400)
          .json({ message: 'Title and description required' })
      const job = await Job.create({
        title,
        description,
        createdBy: new mongoose.Types.ObjectId(req.user!.id),
      })
      res.json({ message: 'Job created', job })
    } catch (e) {
      res.status(500).json({ message: 'Server error' })
    }
  }
)

router.get(
  '/employer/jobs',
  requireAuth,
  requireEmployer,
  async (req: Request, res: Response) => {
    try {
      const jobs = await Job.find({ createdBy: req.user!.id }).sort({
        createdAt: -1,
      })
      res.json({ jobs })
    } catch {
      res.status(500).json({ message: 'Server error' })
    }
  }
)

// Delete my job
router.delete(
  '/employer/jobs/:id',
  requireAuth,
  requireEmployer,
  async (req: Request, res: Response) => {
    try {
      const job = await Job.findOneAndDelete({
        _id: req.params.id,
        createdBy: req.user!.id,
      })

      if (!job) return res.status(404).json({ message: 'Job not found' })

      // Update all applications that used this job
      await Application.updateMany(
        { jobId: job._id },
        { $set: { jobId: null } } // job deleted, mark as null
      )

      res.json({ message: 'Job deleted and affected applications updated' })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  }
)

// View applications for a job I own
router.get(
  '/employer/jobs/:id/applications',
  requireAuth,
  requireEmployer,
  async (req: Request, res: Response) => {
    try {
      const job = await Job.findOne({
        _id: req.params.id,
        createdBy: req.user!.id,
      })
      if (!job) return res.status(404).json({ message: 'Job not found' })
      const apps = await Application.find({ jobId: job._id })
        .populate('userId', 'name email')
        .select('status resume userId')
      res.json({ applications: apps })
    } catch {
      res.status(500).json({ message: 'Server error' })
    }
  }
)
// Apply for a job
router.post(
  '/applications/',
  requireAuth,
  upload.single('resume'),
  createApplication
)

// Get applications of current user (applicant)
router.get('/applications/my', requireAuth, getApplicationsByUser)

// Get applications for a job (employer/admin)
router.get('/job/:jobId', requireAuth, getApplicationsByJob)
router.get('/jobs', requireAuth, getJobs)
router.get('/api/jobs', async (_req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 })
    res.json({ jobs })
  } catch (err: any) {
    res.status(500).json({ message: err.message || 'Failed to fetch jobs' })
  }
})
router.post(
  '/applications/:id/status',
  requireAuth,
  requireEmployer,
  async (req, res) => {
    try {
      const { id } = req.params
      const { status } = req.body

      if (!['accepted', 'shortlisted', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status' })
      }

      const application = await Application.findById(id)
      if (!application) {
        return res.status(404).json({ message: 'Application not found' })
      }

      application.status = status
      await application.save()

      return res.json({ application })
    } catch (err: any) {
      console.error(err)
      return res.status(500).json({ message: 'Server error' })
    }
  }
)

export default router
