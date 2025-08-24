import mongoose, { Schema, Document, Types } from 'mongoose'

export interface IJob extends Document {
  title: string
  description: string
  createdBy: Types.ObjectId
  createdAt: Date
}

const jobSchema = new Schema<IJob>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
)

export default mongoose.model<IJob>('Job', jobSchema)
