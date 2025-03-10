"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryCatch = exports.errorMiddleware = void 0;
const app_js_1 = require("@/app.js");
const errorMiddleware = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    err.message ||= "Internal Server Error";
    err.statusCode = err.statusCode || 500;
    const response = {
        success: false,
        message: err.message,
    };
    if (app_js_1.envMode === "DEVELOPMENT") {
        response.error = err;
    }
    return res.status(err.statusCode).json(response);
};
exports.errorMiddleware = errorMiddleware;
const TryCatch = (passedFunc) => async (req, res, next) => {
    try {
        await passedFunc(req, res, next);
    }
    catch (error) {
        next(error);
    }
};
exports.TryCatch = TryCatch;
