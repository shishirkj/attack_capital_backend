import mongoose from "mongoose";
export const connectDB = (uri) => mongoose
    .connect(uri, {
    retryWrites: true,
    w: "majority",
})
    .then((c) => {
    console.log(`Connected with ${c.connection.name}`);
})
    .catch((e) => console.log(e));
