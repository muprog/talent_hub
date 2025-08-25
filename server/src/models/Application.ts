import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IApplication extends Document {
  jobId: Types.ObjectId
  userId: Types.ObjectId
  status: 'applied' | 'shortlisted' | 'rejected' | 'accepted'
  resume?: string // file path
  createdAt: Date
}

const applicationSchema = new Schema<IApplication>(
  {
    jobId: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: {
      type: String,
      enum: ['applied', 'shortlisted', 'rejected', 'accepted'],
      default: 'applied',
    },
    resume: { type: String },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
)

export default mongoose.model<IApplication>('Application', applicationSchema)
