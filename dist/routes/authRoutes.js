"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validate_1 = require("@/middlewares/validate");
const authValidation_1 = require("@/validations/authValidation");
const authController_1 = require("@/controllers/authController");
const router = express_1.default.Router();
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
router.post("/signup", (0, validate_1.validate)(authValidation_1.signupSchema), authController_1.signup);
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
router.post("/login", (0, validate_1.validate)(authValidation_1.loginSchema), authController_1.login);
exports.default = router;
