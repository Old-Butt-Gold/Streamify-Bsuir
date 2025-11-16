import express from "express";
import "dotenv/config";
import authRoutes from "./routes/auth.route.js";
import {connectDB} from "./lib/db.js";
import cookieParser from "cookie-parser";

const app = express();
const PORT = process.env.PORT;

app.get("/", (req, res) => {
   res.send("Echo endpoint");
});

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.listen(PORT, async () => {
    console.log(`Server running at http://localhost:${PORT}`);
    await connectDB();
})