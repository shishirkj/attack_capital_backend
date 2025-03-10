import { ZodError } from "zod";
export const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof ZodError) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.errors,
            });
        }
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
