import { z } from "zod";
export const signupSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    name: z.string().min(1, { message: "Name should be  valid" }).max(30),
    password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters" })
        .max(50),
});
export const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email format" }),
    password: z
        .string()
        .min(6, { message: "Password must be at least 6 characters" }),
});
