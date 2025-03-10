"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPostById = exports.getPostsByAuthor = exports.getAllPosts = exports.createPost = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const error_1 = require("../middlewares/error");
const errorHandler_1 = __importDefault(require("../utils/errorHandler"));
const user_1 = require("../models/user");
const post_1 = require("../models/post");
//create post
exports.createPost = (0, error_1.TryCatch)(async (req, res, next) => {
    const { title, content } = req.body;
    if (!req.user) {
        return next(new errorHandler_1.default(401, "Unauthorized"));
    }
    if (!title || !content) {
        return next(new errorHandler_1.default(400, "Title and content are required"));
    }
    const user = await user_1.User.findById(req.user.id);
    if (!user) {
        return next(new errorHandler_1.default(404, "User not found"));
    }
    const authorName = user.name;
    const newPost = await post_1.Post.create({
        title,
        content,
        authorId: req.user.id,
        authorName,
    });
    res
        .status(201)
        .json({ success: true, message: "Post created", post: newPost });
});
exports.getAllPosts = (0, error_1.TryCatch)(async (req, res, next) => {
    const { page = 1, limit = 5 } = req.query;
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    if (Number.isNaN(pageNumber) ||
        Number.isNaN(limitNumber) ||
        pageNumber < 1 ||
        limitNumber < 1) {
        return next(new errorHandler_1.default(400, "Invalid pagination parameters"));
    }
    // Get total count for hasMore calculation
    const totalCount = await post_1.Post.countDocuments();
    const posts = await post_1.Post.find({})
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);
    if (!posts.length) {
        return next(new errorHandler_1.default(404, "No posts found"));
    }
    const hasMore = totalCount > pageNumber * limitNumber;
    res.status(200).json({
        success: true,
        posts,
        hasMore,
        total: totalCount,
    });
});
exports.getPostsByAuthor = (0, error_1.TryCatch)(async (req, res, next) => {
    const { authorId } = req.query;
    const { page = 1, limit = 5 } = req.query;
    if (!authorId) {
        return next(new errorHandler_1.default(400, "Author ID is required"));
    }
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    if (Number.isNaN(pageNumber) ||
        Number.isNaN(limitNumber) ||
        pageNumber < 1 ||
        limitNumber < 1) {
        return next(new errorHandler_1.default(400, "Invalid pagination parameters"));
    }
    // Get total count for hasMore calculation
    const totalCount = await post_1.Post.countDocuments({ authorId });
    const posts = await post_1.Post.find({ authorId })
        .skip((pageNumber - 1) * limitNumber)
        .limit(limitNumber);
    if (!posts.length) {
        return next(new errorHandler_1.default(404, "No posts found for this author"));
    }
    const hasMore = totalCount > pageNumber * limitNumber;
    res.status(200).json({
        success: true,
        posts,
        hasMore,
        total: totalCount,
    });
});
exports.getPostById = (0, error_1.TryCatch)(async (req, res, next) => {
    const { id } = req.params;
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        return next(new errorHandler_1.default(400, "Invalid post ID"));
    }
    const post = await post_1.Post.findById(id);
    if (!post) {
        return next(new errorHandler_1.default(404, "Post not found"));
    }
    return res.status(200).json({
        success: true,
        post,
    });
});
