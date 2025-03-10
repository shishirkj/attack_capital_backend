import config from "../config/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10);
};
export const comparePasswords = async (password, hash) => {
    return await bcrypt.compare(password, hash);
};
export const sendCookie = ({ user, res, statusCode, message, }) => {
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
        token: token,
        user: user,
    });
};
