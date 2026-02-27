import mongoose from "mongoose";

export default async function connectDb(mongo_uri: string) {
    await mongoose.connect(mongo_uri);
}
