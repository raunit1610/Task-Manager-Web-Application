import Tasks from "../models/Tasks.js";

async function handleGetTasks(req, res) {
  try {
    const { uid } = req.params;

    if (!uid) {
      return res.status(400).json({ message: "User ID (uid) is required" });
    }

    const tasky = await Tasks.find({ uid: uid });

    const currentDate = new Date();
    tasky.forEach((task) => {
      const dueDate = new Date(task.dueDate);
      const totalDays = (dueDate - currentDate) / (24 * 60 * 60 * 1000);
      const daysLeft = Math.max(0, totalDays);
      const maxDays = 30;
      task.status = Math.round(((maxDays - daysLeft) / maxDays) * 99) + 1;
      task.status = Math.min(100, Math.max(1, task.status));
    });

    const tasks = tasky.filter((task) => task.status < 100);

    tasks.sort((a, b) => b.status - a.status);

    tasks.forEach((task, index) => {
      task.priority = index + 1;
      task.save();
    });

    // Delete tasks with status 100 from the database
    await Tasks.deleteMany({ uid: uid, status: 100 });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function handlecreateTask(req, res) {
  const { name, description, dueDate, status, uid } = req.body;

  if (!uid) {
    return res.status(400).json({
      message: "User ID (uid) is required",
    });
  }

  const arr = await Tasks.find();
  const priority = arr.length + 1;
  const newTask = new Tasks({
    uid,
    name,
    description,
    dueDate,
    status,
    priority,
  }); //Create Instance of Database instead of Creating Object
  try {
    await newTask.save(); //Save That Instance in Database
    res.status(200).json({
      message: "Task Created Successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}

async function handleDeleteTask(req, res) {
  const { id } = req.params;
  try {
    const task = await Tasks.findByIdAndDelete(id);
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({
      message: error.message,
    });
  }
}

async function handleUpdateTask(req, res) {
  const { id } = req.params;
  const { name, description, dueDate } = req.body;
  try {
    const task = await Tasks.findByIdAndUpdate(id, {
      name,
      description,
      dueDate,
    });
    if (!task) {
      return res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json({
      message: "Task updated successfully",
    });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({
      message: error.message,
    });
  }
}

export { handlecreateTask, handleGetTasks, handleDeleteTask, handleUpdateTask };
