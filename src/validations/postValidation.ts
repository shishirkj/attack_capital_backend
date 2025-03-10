import { z } from "zod";

export const postSchema = z.object({
	title: z.string().min(1, { message: "Title must be at least 3 characters" }),
	content: z
		.string()
		.min(1, { message: "Content must be at least 10 characters" }),
});
