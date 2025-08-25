import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
interface AuthUser {
  id: string
  role: 'employer' | 'applicant' | 'admin' // whatever roles you support
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as AuthUser
    req.user = decoded // ✅ Now includes both id and role
    next()
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' })
  }
}
