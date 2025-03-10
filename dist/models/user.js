"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true,
    },
    name: {
        type: String,
        required: [true, "Please enter name"],
    },
    passwordHash: {
        type: String,
        required: [true, "Please enter password"],
        select: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.User = mongoose_1.default.model("User", schema);
