import express from "express";
import {
  handlecreateTask,
  handleGetTasks,
  handleDeleteTask,
  handleUpdateTask,
} from "../../controllers/Tasks.js";

const TasksRouter = express.Router();

TasksRouter.get("/:uid/", handleGetTasks);
TasksRouter.post("/:uid/create", handlecreateTask);
TasksRouter.delete("/:uid/delete/:id", handleDeleteTask);
TasksRouter.put("/:uid/update/:id", handleUpdateTask);

export default TasksRouter;
