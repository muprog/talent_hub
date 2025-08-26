"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
// Storage configuration
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'uploads/resumes/');
    },
    filename: (_req, file, cb) => {
        // Always save with timestamp + original extension
        const ext = path_1.default.extname(file.originalname).toLowerCase();
        const uniqueName = `${Date.now()}${ext}`; // e.g. 1756049507213.pdf
        cb(null, uniqueName);
    },
});
// File filter
const fileFilter = (_req, file, cb) => {
    const ext = path_1.default.extname(file.originalname).toLowerCase();
    if (ext !== '.pdf' && ext !== '.doc' && ext !== '.docx') {
        return cb(new Error('Only PDF or DOC files are allowed'));
    }
    cb(null, true);
};
// Export multer instance
exports.upload = (0, multer_1.default)({ storage, fileFilter });
//# sourceMappingURL=upload.js.map