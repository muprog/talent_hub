"use strict";
// import { Request, Response, NextFunction } from 'express'
// import jwt from 'jsonwebtoken'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireEmployer = exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    if (!auth)
        return res.status(401).json({ message: 'Unauthorized' });
    const token = auth.split(' ')[1];
    try {
        const decoded = jsonwebtoken_1.default.verify(token ? token : '', process.env.JWT_SECRET);
        // Explicitly check the payload shape
        if (typeof decoded === 'object' &&
            decoded !== null &&
            'id' in decoded &&
            'role' in decoded) {
            req.user = decoded;
            return next();
        }
        return res.status(401).json({ message: 'Invalid token payload' });
    }
    catch {
        return res.status(401).json({ message: 'Invalid token' });
    }
};
exports.requireAuth = requireAuth;
const requireEmployer = (req, res, next) => {
    if (!req.user)
        return res.status(401).json({ message: 'Unauthorized' });
    if (req.user.role !== 'employer' && req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Employers only' });
    }
    next();
};
exports.requireEmployer = requireEmployer;
//# sourceMappingURL=auth.js.map