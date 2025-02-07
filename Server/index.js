import express from "express";
import cors from "cors";
import ConnectionDB from "./assets/ConnectionDB.js";
import LoginRouter from "./assets/routes/LoginRouter.js";
import TasksRouter from "./assets/routes/TasksRouter.js";

const app = express();
const PORT = 8000;

ConnectionDB("Enter Your MongoDB Url Here!!").then(() =>
  console.log("MongoDB Connected")
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/login", LoginRouter);
app.use("/tasks", TasksRouter);

app.listen(PORT, () => {
  console.log("Server Is Live on PORT: ", PORT);
});
