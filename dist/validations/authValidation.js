"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.signupSchema = void 0;
const zod_1 = require("zod");
exports.signupSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    name: zod_1.z.string().min(1, { message: "Name should be  valid" }).max(30),
    password: zod_1.z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(50),
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "Invalid email format" }),
    password: zod_1.z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
});
