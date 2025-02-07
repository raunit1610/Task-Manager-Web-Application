import React from "react";
import axios from "axios";
import BodyContainer from "./BodyContainer.jsx";
import AddTask from "./AddTask.jsx";
import EndAddTask from "./EndAddTask.jsx";
import TaskForm from "./TaskForm.jsx";
import EditTask from "./EditTask.jsx";

const Body = (props) => {
  const [showAddNewTask, setShowAddNewTask] = React.useState(false);
  const [showAddTask, setShowAddTask] = React.useState(false);
  const [tasks, setTasks] = React.useState([]);
  const [editTask, setEditTask] = React.useState(false);
  const [editId, setEditId] = React.useState("");

  React.useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/tasks/${props.uid}/`
        );
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  function handleNewTask(e, obj) {
    if (showAddNewTask) {
      setShowAddTask(e);
    }
    setShowAddNewTask(e);

    setTasks([...tasks, obj]);
  }

  function handleAddTask(e) {
    setShowAddTask(e);
  }

  async function handleDeleteTask(id) {
    setTasks(tasks.filter((task) => task._id !== id));
    try {
      const response = await axios.delete(
        `http://localhost:8000/tasks/${props.uid}/delete/${id}`
      );
      if (response.status === 200) {
        console.log("Task deleted Successfully");
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  function handleEditTask(e, id) {
    setEditId(id);
    setEditTask(e);
  }
  function handleUpdateEditTask(obj) {
    setTasks(
      tasks.map((task) =>
        task._id === editId
          ? {
              ...task,
              name: obj.name,
              description: obj.description,
              dueDate: obj.dueDate,
            }
          : task
      )
    );
    setEditTask(false);
  }

  return (
    <div className="Body">
      {tasks.map((task) => (
        <BodyContainer
          key={task._id}
          name={task.name}
          description={task.description}
          status={task.status}
          dueDate={task.dueDate}
          priority={task.priority}
          id={task._id}
          deleteTask={handleDeleteTask}
          editTask={handleEditTask}
          currentEdit={editTask}
        />
      ))}
      {showAddTask && !editTask && (
        <TaskForm
          newTask={handleNewTask}
          taskset={tasks.length + 1}
          uid={props.uid}
        />
      )}
      {editTask && (
        <EditTask id={editId} newTask={handleUpdateEditTask} uid={props.uid} />
      )}
      {!showAddTask && <AddTask newTask={handleAddTask} />}
      {showAddTask && <EndAddTask endTask={handleAddTask} />}
    </div>
  );
};

export default Body;
