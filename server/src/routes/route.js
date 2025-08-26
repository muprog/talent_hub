"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const Job_1 = __importDefault(require("../models/Job"));
const Application_1 = __importDefault(require("../models/Application"));
const upload_1 = require("../middleware/upload");
const mongoose_1 = __importDefault(require("mongoose"));
const { test, register, verifyOtp, login, forgotPassword, resetPassword, verifyRegister, createApplication, getApplicationsByUser, getApplicationsByJob, getAllJobs, getJobs, } = require('../controller/controller');
const router = express_1.default.Router();
router.post('/', test);
router.post('/register', register);
router.post('/verify-otp', verifyOtp);
router.post('/verify-register', verifyOtp);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/employer/jobs', auth_1.requireAuth, auth_1.requireEmployer, async (req, res) => {
    try {
        const { title, description } = req.body;
        if (!title || !description)
            return res
                .status(400)
                .json({ message: 'Title and description required' });
        const job = await Job_1.default.create({
            title,
            description,
            createdBy: new mongoose_1.default.Types.ObjectId(req.user.id),
        });
        res.json({ message: 'Job created', job });
    }
    catch (e) {
        res.status(500).json({ message: 'Server error' });
    }
});
router.get('/employer/jobs', auth_1.requireAuth, auth_1.requireEmployer, async (req, res) => {
    try {
        const jobs = await Job_1.default.find({ createdBy: req.user.id }).sort({
            createdAt: -1,
        });
        res.json({ jobs });
    }
    catch {
        res.status(500).json({ message: 'Server error' });
    }
});
// Delete my job
router.delete('/employer/jobs/:id', auth_1.requireAuth, auth_1.requireEmployer, async (req, res) => {
    try {
        const job = await Job_1.default.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user.id,
        });
        if (!job)
            return res.status(404).json({ message: 'Job not found' });
        // Update all applications that used this job
        await Application_1.default.updateMany({ jobId: job._id }, { $set: { jobId: null } } // job deleted, mark as null
        );
        res.json({ message: 'Job deleted and affected applications updated' });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});
// View applications for a job I own
router.get('/employer/jobs/:id/applications', auth_1.requireAuth, auth_1.requireEmployer, async (req, res) => {
    try {
        const job = await Job_1.default.findOne({
            _id: req.params.id,
            createdBy: req.user.id,
        });
        if (!job)
            return res.status(404).json({ message: 'Job not found' });
        const apps = await Application_1.default.find({ jobId: job._id })
            .populate('userId', 'name email')
            .select('status resume userId');
        res.json({ applications: apps });
    }
    catch {
        res.status(500).json({ message: 'Server error' });
    }
});
// Apply for a job
router.post('/applications/', auth_1.requireAuth, upload_1.upload.single('resume'), createApplication);
// Get applications of current user (applicant)
router.get('/applications/my', auth_1.requireAuth, getApplicationsByUser);
// Get applications for a job (employer/admin)
router.get('/job/:jobId', auth_1.requireAuth, getApplicationsByJob);
router.get('/jobs', auth_1.requireAuth, getJobs);
router.get('/api/jobs', async (_req, res) => {
    try {
        const jobs = await Job_1.default.find().sort({ createdAt: -1 });
        res.json({ jobs });
    }
    catch (err) {
        res.status(500).json({ message: err.message || 'Failed to fetch jobs' });
    }
});
router.post('/applications/:id/status', auth_1.requireAuth, auth_1.requireEmployer, async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        if (!['accepted', 'shortlisted', 'rejected'].includes(status)) {
            return res.status(400).json({ message: 'Invalid status' });
        }
        const application = await Application_1.default.findById(id);
        if (!application) {
            return res.status(404).json({ message: 'Application not found' });
        }
        application.status = status;
        await application.save();
        return res.json({ application });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Server error' });
    }
});
exports.default = router;
//# sourceMappingURL=route.js.map