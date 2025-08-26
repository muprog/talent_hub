import mongoose, { Document } from 'mongoose';
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: 'employer' | 'applicant' | 'admin';
    isVerified: boolean;
    otp?: string | undefined;
    otpExpiry?: Date | undefined;
    resetAllowed?: boolean;
    resetExpiry?: Date | undefined;
}
declare const _default: mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=User.d.ts.map