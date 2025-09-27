import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import errorHandler from "./middlewares/errorHandler.js";
import authRoutes from "./routes/authRoutes.js";
import universitiesRoutes from "./routes/universityRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import sportsRoutes from "./routes/sportsRoutes.js";
import researchRoutes from "./routes/researchRoutes.js";
import photoRoutes from "./routes/photosRoutes.js";
import uploadImageRoutes from "./routes/uploadImageRoute.js";
import admissionRoutes from "./routes/admissionRoute.js";
import reviewsRoutes from "./routes/reviewsRoutes.js";
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.get("/", (req, res) => res.send("Hello from NPL Backend!"));

app.use("/api/auth", authRoutes);
app.use("/api/universities", universitiesRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/sports", sportsRoutes);
app.use("/api/research", researchRoutes);

app.use("/api/photos", photoRoutes);
app.use("/api/admission", admissionRoutes);
app.use("/api/reviews", reviewsRoutes);
app.use("/api/upload/", uploadImageRoutes);
// Global error handler
app.use(errorHandler);

export default app;
