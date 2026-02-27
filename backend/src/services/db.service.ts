import mongoose from "mongoose";

async function connectDb(mongo_uri: string) {
    return mongoose.connect(mongo_uri);
}
