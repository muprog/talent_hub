"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
const nodemailer = require('nodemailer');
const sendMail = async (to, subject, text) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    await transporter.sendMail({
        from: `"TalentHub" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
    });
};
exports.sendMail = sendMail;
//# sourceMappingURL=mailer.js.map