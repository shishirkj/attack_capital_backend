import type { Request, Response, NextFunction } from "express";
import {
	hashPassword,
	comparePasswords,
	sendCookie,
} from "../services/authService";
import { isStrongPassword } from "../utils/core";
import { TryCatch } from "../middlewares/error";
import { User } from "../models/user";
import ErrorHandler from "../utils/errorHandler";


export const signup = TryCatch(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password, name } = req.body;

		if (!isStrongPassword(password)) {
			return next(
				new ErrorHandler(
					400,
					"Password must be at least 8 characters long, include uppercase, lowercase, a number, and a special character.",
				),
			);
		}

		const userExists = await User.findOne({ email });
		if (userExists) return next(new ErrorHandler(400, "User already exists"));

		const passwordHash = await hashPassword(password);
		const newUser = await User.create({ email, passwordHash, name });
		return sendCookie({
			user: newUser,
			res,
			statusCode: 201,
			message: "User created successfully",
		});
	},
);

export const login = TryCatch(
	async (req: Request, res: Response, next: NextFunction) => {
		const { email, password } = req.body;
		const user = await User.findOne({ email }).select("+passwordHash");
		if (!user || !(await comparePasswords(password, user.passwordHash))) {
			return next(new ErrorHandler(401, "Invalid credentials"));
		}
		return sendCookie({
			user,
			res,
			statusCode: 200,
			message: "Logged in successfully",
		});
	},
);
