import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth_routes.js";
import userRouter from "./routes/user_routes.js"
;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "API up and running!"})
});

app.use("/api/auth", authRouter);

app.use("/api/users", userRouter);

export default app;