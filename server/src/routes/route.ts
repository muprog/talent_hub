import express from 'express'
import { requireAuth, requireEmployer } from '../middleware/auth'
import Job from '../models/Job'
import Application from '../models/Application'
import { Request, Response } from 'express'
import mongoose from 'mongoose'
const {
  test,
  register,
  verifyOtp,
  login,
  forgotPassword,
  resetPassword,
  verifyRegister,
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

// List my jobs
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
      res.json({ message: 'Job deleted' })
    } catch {
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
      const apps = await Application.find({ jobId: job._id }).populate(
        'userId',
        'name email'
      )
      res.json({ applications: apps })
    } catch {
      res.status(500).json({ message: 'Server error' })
    }
  }
)

export default router
