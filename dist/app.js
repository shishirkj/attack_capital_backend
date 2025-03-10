"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.envMode = void 0;
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const error_js_1 = require("@/middlewares/error.js");
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = require("@/lib/db.js");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const config_1 = __importDefault(require("./config/config"));
const swagger_1 = require("./swagger");
dotenv_1.default.config({ path: "./.env" });
exports.envMode = process.env.NODE_ENV?.trim() || "DEVELOPMENT";
const port = config_1.default.port || 5000;
const mongoURI = config_1.default.mongoURI || "mongodb://localhost:27017";
(0, db_js_1.connectDB)(mongoURI);
const app = (0, express_1.default)();
app.use((0, helmet_1.default)({
    contentSecurityPolicy: exports.envMode !== "DEVELOPMENT",
    crossOriginEmbedderPolicy: exports.envMode !== "DEVELOPMENT",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: config_1.default.frontendUrl, credentials: true }));
(0, swagger_1.setupSwagger)(app);
app.use("/auth", authRoutes_1.default);
app.use("/posts", postRoutes_1.default);
app.get("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Page not found",
    });
});
app.use(error_js_1.errorMiddleware);
app.listen(port, () => console.log(`Server is working on Port:${port} in ${exports.envMode} Mode.`));
