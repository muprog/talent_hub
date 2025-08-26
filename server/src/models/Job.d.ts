import mongoose, { Document, Types } from 'mongoose';
export interface IJob extends Document {
    title: string;
    description: string;
    createdBy: Types.ObjectId;
    createdAt: Date;
}
declare const _default: mongoose.Model<IJob, {}, {}, {}, mongoose.Document<unknown, {}, IJob, {}, {}> & IJob & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default _default;
//# sourceMappingURL=Job.d.ts.map