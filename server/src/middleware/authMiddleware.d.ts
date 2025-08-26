import { Request, Response, NextFunction } from 'express'
interface AuthUser {
  id: string
  role: 'employer' | 'applicant' | 'admin'
}
declare global {
  namespace Express {
    interface Request {
      user?: AuthUser
    }
  }
}
export declare const authMiddleware: (
  req: Request,
  res: Response,
  next: NextFunction
) => Response<any, Record<string, any>> | undefined
export {}
