import jwt from "jsonwebtoken";
import config from "../config/config";
export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized: No token provided or invalid format"
        });
    }
    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, config.jwtSecret);
        req.user = { id: decoded.id };
        next();
    }
    catch {
        return res.status(403).json({
            success: false,
            message: "Forbidden: Invalid token"
        });
    }
};
