import config from "@/config/config";
import type { IUser } from "@/models/user";
import bcrypt from "bcryptjs";
import type { Response } from "express";
import jwt from "jsonwebtoken";

export const hashPassword = async (password: string) => {
	return await bcrypt.hash(password, 10);
};

export const comparePasswords = async (password: string, hash: string) => {
	return await bcrypt.compare(password, hash);
};

export const sendCookie = ({
	user,
	res,
	statusCode,
	message,
}: { user: IUser; res: Response; statusCode: number; message: string }) => {
	const token = jwt.sign({ id: user._id }, config.jwtSecret);
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
			token:token,
			user:user,
		});
};
