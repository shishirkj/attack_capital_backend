import express from "express";
import { validate } from "../middlewares/validate";
import { loginSchema, signupSchema } from "../validations/authValidation";
import { login, signup } from "../controllers/authController";
const router = express.Router();
/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: Register a new user
 *     tags: [Authentication]
 *     description: Creates a new user account
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Signup'
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Validation error or user already exists
 */
router.post("/signup", validate(signupSchema), signup);
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: User login
 *     tags: [Authentication]
 *     description: Authenticates a user and returns a JWT token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Login'
 *     responses:
 *       200:
 *         description: Successful authentication, returns JWT token
 *       401:
 *         description: Invalid credentials
 */
router.post("/login", validate(loginSchema), login);
export default router;
