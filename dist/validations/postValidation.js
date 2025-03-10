"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const zod_1 = require("zod");
exports.postSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: "Title must be at least 3 characters" }),
    content: zod_1.z
        .string()
        .min(1, { message: "Content must be at least 10 characters" }),
});
