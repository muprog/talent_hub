import mongoose, { Document, Types } from 'mongoose';
export interface IApplication extends Document {
    jobId: Types.ObjectId;
    userId: Types.ObjectId;
    status: 'applied' | 'shortlisted' | 'rejected' | 'accepted';
    resume?: string;
    createdAt: Date;
}
declare const _default: mongoose.Model<IApplication, {}, {}, {}, mongoose.Document<unknown, {}, IApplication, {}, {}> & IApplication & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Application.d.ts.map