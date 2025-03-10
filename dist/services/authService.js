"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendCookie = exports.comparePasswords = exports.hashPassword = void 0;
const config_1 = __importDefault(require("@/config/config"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const hashPassword = async (password) => {
    return await bcryptjs_1.default.hash(password, 10);
};
exports.hashPassword = hashPassword;
const comparePasswords = async (password, hash) => {
    return await bcryptjs_1.default.compare(password, hash);
};
exports.comparePasswords = comparePasswords;
const sendCookie = ({ user, res, statusCode, message, }) => {
    const token = jsonwebtoken_1.default.sign({ id: user._id }, config_1.default.jwtSecret);
    res
        .status(statusCode)
        .cookie("token", token, {
        httpOnly: false,
        maxAge: 15 * 60 * 1000,
        sameSite: "none",
        secure: true,
    })
        .json({
        success: true,
        message: message,
        token: token,
        user: user,
    });
};
exports.sendCookie = sendCookie;
