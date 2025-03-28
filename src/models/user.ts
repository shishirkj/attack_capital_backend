import mongoose from "mongoose";

export interface IUser {
	name: string;
	email: string;
	passwordHash: string;
	createdAt: Date;
	_id?: string;
}

type IUserModel = mongoose.Model<IUser> & {};

const schema = new mongoose.Schema({
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

export const User = mongoose.model<IUser, IUserModel>("User", schema);
