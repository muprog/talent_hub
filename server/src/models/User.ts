import mongoose, { Document, Schema } from 'mongoose'

export interface IUser extends Document {
  name: string
  email: string
  password: string
  role: 'employer' | 'applicant' | 'admin'
  isVerified: boolean
  otp?: string | undefined
  otpExpiry?: Date | undefined
  resetAllowed?: boolean
  resetExpiry?: Date | undefined
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ['employer', 'applicant', 'admin'],
    default: 'applicant',
  },
  isVerified: { type: Boolean, default: false },
  otp: { type: String },
  otpExpiry: { type: Date },
  resetAllowed: { type: Boolean },
  resetExpiry: { type: Date },
})

export default mongoose.model<IUser>('User', userSchema)
