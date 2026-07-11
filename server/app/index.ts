import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import mobileRouter from "./routes/mobile";
import adminRouter from "./routes/admin";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/mobile", mobileRouter);
app.use("/api/v1/admin", adminRouter);

app.get("/", (_req, res) => {
  res.json({
    message: "Welcome to Koperasi-Point API server!",
    status: "Running",
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (_req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

if (process.env.VERCEL !== "1") {
  app.listen(PORT, () => {
    console.log("=================================");
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
    console.log("=================================");
  });
}

export default app;
