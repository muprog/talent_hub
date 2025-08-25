import { Request, Response } from 'express'
import User from '../models/User'
import { sendMail } from '../utils/mailer'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Application from '../models/Application'
import Job from '../models/Job'
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString()

const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body

    const userExists = await User.findOne({ email })
    if (userExists)
      return res.status(400).json({ message: 'User already exists' })

    const hashedPassword = await bcrypt.hash(password, 10)
    const otp = generateOTP()
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000) // 5 min expiry

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      otp,
      otpExpiry,
    })

    await sendMail(email, 'TalentHub OTP Verification', `Your OTP is: ${otp}`)

    res
      .status(201)
      .json({ message: 'User registered, please verify OTP', userId: user._id })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}
const test = async (req: Request, res: Response) => {
  await res.send('Hello')
}

const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { userId, otp } = req.body

    const user = await User.findById(userId)
    if (!user) return res.status(400).json({ message: 'User not found' })

    if (!user.otp || !user.otpExpiry)
      return res.status(400).json({ message: 'No OTP generated' })

    if (user.otp !== otp)
      return res.status(400).json({ message: 'Invalid OTP' })

    if (user.otpExpiry < new Date())
      return res.status(400).json({ message: 'OTP expired' })

    // Mark user as verified
    user.isVerified = true
    user.otp = undefined
    user.otpExpiry = undefined
    await user.save()

    res.json({ message: 'OTP verified successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'Invalid credentials' })
    if (!user.isVerified)
      return res.status(403).json({ message: 'Please verify your email first' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ message: 'Invalid credentials' })

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: '1d' }
    )

    res.json({ token, user })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'User not found' })

    const otp = generateOTP() // 6-digit code
    user.otp = otp
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000) // 5 minutes
    user.resetAllowed = true
    user.resetExpiry = new Date(Date.now() + 5 * 60 * 1000)
    await user.save()

    await sendMail(email, 'TalentHub Password Reset OTP', `Your OTP is: ${otp}`)

    res.json({
      message: 'OTP sent to email. You can now reset password.',
      userId: user._id,
    })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, newPassword } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ message: 'User not found' })

    // Check resetAllowed and resetExpiry instead of OTP
    if (
      !user.resetAllowed ||
      !user.resetExpiry ||
      user.resetExpiry < new Date()
    )
      return res
        .status(400)
        .json({ message: 'You must request a password reset first' })

    if (!newPassword || newPassword.length < 6)
      return res
        .status(400)
        .json({ message: 'Password must be at least 6 characters long' })

    user.password = await bcrypt.hash(newPassword, 10)

    // Clear OTP, expiry, and resetAllowed after reset
    user.otp = undefined
    user.otpExpiry = undefined
    user.resetAllowed = false
    user.resetExpiry = undefined

    await user.save()

    res.json({ message: 'Password reset successful' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const verifyRegister = async (req: Request, res: Response) => {
  try {
    const { userId, otp } = req.body

    const user = await User.findById(userId)
    if (!user) return res.status(400).json({ message: 'User not found' })

    if (!user.otp || !user.otpExpiry)
      return res.status(400).json({ message: 'No OTP generated' })

    if (user.otpExpiry < new Date())
      return res
        .status(400)
        .json({ message: 'OTP expired. Please register again.' })

    if (user.otp !== otp)
      return res.status(400).json({ message: 'Invalid OTP' })

    user.isVerified = true
    user.otp = undefined
    user.otpExpiry = undefined
    await user.save()

    res.json({ message: 'Email verified successfully. You can now login.' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const createApplication = async (req: any, res: any) => {
  try {
    const { jobId } = req.body
    const resumeFile = req.file?.path // multer file upload

    // Prevent duplicate applications
    const exists = await Application.findOne({ jobId, userId: req.user.id })
    if (exists) return res.status(400).json({ message: 'Already applied' })

    const application = await Application.create({
      jobId,
      userId: req.user.id,
      status: 'applied',
      resume: resumeFile,
    })
    res.json({ application })
  } catch (err) {
    res.status(500).json({ message: 'Failed to create application' })
  }
}

const getApplicationsByUser = async (req: any, res: any) => {
  try {
    const applications = await Application.find({ userId: req.user.id })
      .populate('jobId', 'title description')
      .sort({ createdAt: -1 })
    res.json({ applications })
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications' })
  }
}

// Optional: for employers to see all applications for a job
const getApplicationsByJob = async (req: Request, res: Response) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId })
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })

    res.json({ applications })
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch applications' })
  }
}
const getAllJobs = async (req: Request, res: Response) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 })
    res.json({ jobs })
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs' })
  }
}
const getJobs = async (req: any, res: any) => {
  try {
    const { search } = req.query
    let query: any = {}
    if (search) {
      query.title = { $regex: search, $options: 'i' }
    }
    const jobs = await Job.find(query).sort({ createdAt: -1 })

    // Add application count for analytics
    const jobsWithCount = await Promise.all(
      jobs.map(async (job) => {
        const count = await Application.countDocuments({ jobId: job._id })
        return { ...job.toObject(), applicationCount: count }
      })
    )

    res.json({ jobs: jobsWithCount })
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch jobs' })
  }
}

module.exports = {
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
}
