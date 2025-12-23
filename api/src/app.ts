import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth_routes.js";

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "API up and running!"})
});

app.use("/api", authRouter);

export default app;