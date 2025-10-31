import mongoose from "mongoose";

export async function connectDB(): Promise<void> {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://appuser:app123@localhost:27017/rest-app-db?authSource=rest-app-db');
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error", error);
        process.exit(1);
    }
}