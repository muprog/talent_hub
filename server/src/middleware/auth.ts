// import { Request, Response, NextFunction } from 'express'
// import jwt from 'jsonwebtoken'

// export interface AuthUser {
//   id: string
//   role: 'employer' | 'applicant' | 'admin'
// }
// declare module 'express-serve-static-core' {
//   interface Request {
//     user?: AuthUser
//   }
// }

// export const requireAuth = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const auth = req.headers.authorization
//   if (!auth) return res.status(401).json({ message: 'Unauthorized' })
//   const token = auth.split(' ')[1]
//   try {
//     const decoded = jwt.verify(
//       token,
//       process.env.JWT_SECRET as string
//     ) as AuthUser
//     req.user = decoded
//     next()
//   } catch {
//     return res.status(401).json({ message: 'Invalid token' })
//   }
// }

// export const requireEmployer = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
//   if (req.user.role !== 'employer' && req.user.role !== 'admin') {
//     return res.status(403).json({ message: 'Employers only' })
//   }
//   next()
// }

import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export interface AuthUser {
  id: string
  role: 'employer' | 'applicant' | 'admin'
}

declare module 'express-serve-static-core' {
  interface Request {
    user?: AuthUser
  }
}

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization
  if (!auth) return res.status(401).json({ message: 'Unauthorized' })

  const token = auth.split(' ')[1]

  try {
    const decoded = jwt.verify(
      token ? token : '',
      process.env.JWT_SECRET as string
    )

    // Explicitly check the payload shape
    if (
      typeof decoded === 'object' &&
      decoded !== null &&
      'id' in decoded &&
      'role' in decoded
    ) {
      req.user = decoded as AuthUser
      return next()
    }

    return res.status(401).json({ message: 'Invalid token payload' })
  } catch {
    return res.status(401).json({ message: 'Invalid token' })
  }
}

export const requireEmployer = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' })
  if (req.user.role !== 'employer' && req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Employers only' })
  }
  next()
}
