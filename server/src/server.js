"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const route_1 = __importDefault(require("./routes/route"));
const db_1 = __importDefault(require("./config/db"));
const path = require("path");
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use('/uploads', express_1.default.static(path.join(__dirname, '../uploads')));
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL,
    credentials: true,
}));
app.use(express_1.default.json());
app.use('/', route_1.default);
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`server is running on port ${PORT}`));
(0, db_1.default)();
//# sourceMappingURL=server.js.map