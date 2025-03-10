"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.default = {
    port: process.env.PORT || 5000,
    mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/mydb",
    jwtSecret: process.env.JWT_SECRET || "your_jwt_secret",
    frontendUrl: process.env.FRONTEND_URL
};
