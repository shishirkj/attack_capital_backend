import type { Request, Response, NextFunction } from "express";
import ErrorHandler from "@/utils/errorHandler";
import { TryCatch } from "@/middlewares/error";
import type { AuthRequest } from "@/middlewares/authMiddleware";
import { Post } from "@/models/post";
import { User } from "@/models/user";
import mongoose from "mongoose";

export const createPost = TryCatch(
	async (req: AuthRequest, res: Response, next: NextFunction) => {
		const { title, content } = req.body;

		if (!req.user) {
			return next(new ErrorHandler(401, "Unauthorized"));
		}

		if (!title || !content) {
			return next(new ErrorHandler(400, "Title and content are required"));
		}
		const user = await User.findById(req.user.id);
		if (!user) {
			return next(new ErrorHandler(404, "User not found"));
		}
		const authorName = user.name;
		const newPost = await Post.create({
			title,
			content,
			authorId: req.user.id,
			authorName,
		});

		res
			.status(201)
			.json({ success: true, message: "Post created", post: newPost });
	},
);

export const getAllPosts = TryCatch(
	async (req: Request, res: Response, next: NextFunction) => {
		const { page = 1, limit = 5 } = req.query;

		const pageNumber = Number(page);
		const limitNumber = Number(limit);

		if (
			Number.isNaN(pageNumber) ||
			Number.isNaN(limitNumber) ||
			pageNumber < 1 ||
			limitNumber < 1
		) {
			return next(new ErrorHandler(400, "Invalid pagination parameters"));
		}

		// Get total count for hasMore calculation
		const totalCount = await Post.countDocuments();

		const posts = await Post.find({})
			.skip((pageNumber - 1) * limitNumber)
			.limit(limitNumber);

		if (!posts.length) {
			return next(new ErrorHandler(404, "No posts found"));
		}

		const hasMore = totalCount > pageNumber * limitNumber;

		res.status(200).json({
			success: true,
			posts,
			hasMore,
			total: totalCount,
		});
	},
);

export const getPostsByAuthor = TryCatch(
	async (req: Request, res: Response, next: NextFunction) => {
		const { authorId } = req.query;
		const { page = 1, limit = 5 } = req.query;

		if (!authorId) {
			return next(new ErrorHandler(400, "Author ID is required"));
		}

		const pageNumber = Number(page);
		const limitNumber = Number(limit);

		if (
			Number.isNaN(pageNumber) ||
			Number.isNaN(limitNumber) ||
			pageNumber < 1 ||
			limitNumber < 1
		) {
			return next(new ErrorHandler(400, "Invalid pagination parameters"));
		}

		// Get total count for hasMore calculation
		const totalCount = await Post.countDocuments({ authorId });

		const posts = await Post.find({ authorId })
			.skip((pageNumber - 1) * limitNumber)
			.limit(limitNumber);

		if (!posts.length) {
			return next(new ErrorHandler(404, "No posts found for this author"));
		}

		const hasMore = totalCount > pageNumber * limitNumber;

		res.status(200).json({
			success: true,
			posts,
			hasMore,
			total: totalCount,
		});
	},
);

export const getPostById = TryCatch(
	async (req: Request, res: Response, next: NextFunction) => {
		const { id } = req.params;
		if (!mongoose.Types.ObjectId.isValid(id)) {
			return next(new ErrorHandler(400, "Invalid post ID"));
		}

		const post = await Post.findById(id);
		if (!post) {
			return next(new ErrorHandler(404, "Post not found"));
		}

		return res.status(200).json({
			success: true,
			post,
		});
	},
);
// Aaaaaa!!!!!!!!121212!
