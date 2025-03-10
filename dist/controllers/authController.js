"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const authService_1 = require("../services/authService");
const core_1 = require("../utils/core");
const error_1 = require("../middlewares/error");
const user_1 = require("../models/user");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
exports.signup = (0, error_1.TryCatch)(async (req, res, next) => {
    const { email, password, name } = req.body;
    if (!(0, core_1.isStrongPassword)(password)) {
        return next(new errorHandler_1.default(400, "Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character."));
    }
    const userExists = await user_1.User.findOne({ email });
    if (userExists)
        return next(new errorHandler_1.default(400, "User already exists"));
    const passwordHash = await (0, authService_1.hashPassword)(password);
    const newUser = await user_1.User.create({ email, passwordHash, name });
    return (0, authService_1.sendCookie)({
        user: newUser,
        res,
        statusCode: 201,
        message: "User created successfully",
    });
});
exports.login = (0, error_1.TryCatch)(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await user_1.User.findOne({ email }).select("+passwordHash");
    if (!user || !(await (0, authService_1.comparePasswords)(password, user.passwordHash))) {
        return next(new errorHandler_1.default(401, "Invalid credentials"));
    }
    return (0, authService_1.sendCookie)({
        user,
        res,
        statusCode: 200,
        message: "Logged in successfully",
    });
});
