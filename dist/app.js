import express from "express";
import helmet from "helmet";
import cors from "cors";
import { errorMiddleware } from "./middlewares/error.js";
import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/authRoutes";
import postRoutes from "./routes/postRoutes";
import config from "./config/config";
import { setupSwagger } from "./swagger";
dotenv.config({ path: "./.env" });
export const envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = config.port || 5000;
const mongoURI = config.mongoURI || "mongodb://localhost:27017";
connectDB(mongoURI);
const app = express();
app.use(helmet({
    contentSecurityPolicy: envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: envMode !== "DEVELOPMENT",
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: config.frontendUrl, credentials: true }));
setupSwagger(app);
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);
app.get("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Page not found",
    });
});
app.use(errorMiddleware);
app.listen(port, () => console.log(`Server is working on Port:${port} in ${envMode} Mode.`));
