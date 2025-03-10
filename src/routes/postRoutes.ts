import express from "express";

import { authenticateJWT } from "../middlewares/authMiddleware";
import { createPost, getAllPosts, getPostById, getPostsByAuthor } from "../controllers/postController";
import { postSchema } from "../validations/postValidation";
import { validate } from "../middlewares/validate";

const router = express.Router();

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retrieve all posts
 *     tags: [Posts]
 *     description: Fetches all posts with pagination support.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 5
 *         description: Number of posts per page
 *     responses:
 *       200:
 *         description: A list of posts
 *       401:
 *         description: Unauthorized
 */
router.get("/", getAllPosts);

/**
 * @swagger
 * /posts/create:
 *   post:
 *     summary: Create a new post
 *     tags: [Posts]
 *     description: Allows authenticated users to create a new post.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       201:
 *         description: Post successfully created
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 */
router.post("/create", authenticateJWT, validate(postSchema), createPost);

/**
 * @swagger
 * /posts/author:
 *   get:
 *     summary: Retrieve posts by a specific author
 *     tags: [Posts]
 *     description: Fetches posts created by a specific user.
 *     parameters:
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         required: true
 *         description: Author ID to filter posts
 *     responses:
 *       200:
 *         description: A list of posts by the author
 *       400:
 *         description: Missing or invalid author ID
 *       401:
 *         description: Unauthorized
 */
router.get("/author", authenticateJWT, getPostsByAuthor);
/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Retrieve a post by ID
 *     tags: [Posts]
 *     description: Fetches a specific post by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: MongoDB ID of the post
 *     responses:
 *       200:
 *         description: Post details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post not found
 *       400:
 *         description: Invalid post ID
 */
router.get("/:id", getPostById);

export default router;
