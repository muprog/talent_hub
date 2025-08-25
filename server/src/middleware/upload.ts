import multer, { FileFilterCallback } from 'multer'
import { Request } from 'express'
import path from 'path'

// Storage configuration
const storage = multer.diskStorage({
  destination: (
    _req: Request,
    _file: Express.Multer.File,
    cb: (error: Error | null, destination: string) => void
  ) => {
    cb(null, 'uploads/resumes/')
  },
  filename: (
    _req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void
  ) => {
    // Always save with timestamp + original extension
    const ext = path.extname(file.originalname).toLowerCase()
    const uniqueName = `${Date.now()}${ext}` // e.g. 1756049507213.pdf
    cb(null, uniqueName)
  },
})

// File filter
const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const ext = path.extname(file.originalname).toLowerCase()
  if (ext !== '.pdf' && ext !== '.doc' && ext !== '.docx') {
    return cb(new Error('Only PDF or DOC files are allowed'))
  }
  cb(null, true)
}

// Export multer instance
export const upload = multer({ storage, fileFilter })
