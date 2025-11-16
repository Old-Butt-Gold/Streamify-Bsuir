import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log(`MongoDB Connected: ${conn.connection.host} to database ${conn.connection.db.databaseName}`);
    } catch (error) {
        console.log("Error in connection to MongoDB", error);
        process.exit(1);
    }
}