import mongoose, { Schema } from "mongoose";
const PostSchema = new Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        maxlength: [100, "Title cannot be more than 100 characters"],
    },
    content: {
        type: String,
        required: [true, "Content is required"],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Author ID is required"],
    },
    authorName: {
        type: String,
        required: [true, "authorName is required"],
    }
});
export const Post = mongoose.model("Post", PostSchema);
