import { Request, Response, NextFunction } from 'express';
export interface AuthUser {
    id: string;
    role: 'employer' | 'applicant' | 'admin';
}
declare module 'express-serve-static-core' {
    interface Request {
        user?: AuthUser;
    }
}
export declare const requireAuth: (req: Request, res: Response, next: NextFunction) => void | Response<any, Record<string, any>>;
export declare const requireEmployer: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=auth.d.ts.map