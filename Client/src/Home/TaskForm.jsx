import React from "react";
import axios from "axios";

const TaskForm = (props) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");
  const status = "100";
  const submit = async (e) => {
    e.preventDefault();
    const task = {
      name: name,
      description: description,
      dueDate: dueDate,
      status: status,
      uid: props.uid,
    };
    console.log(task);
    try {
      const response = await axios.post(
        `http://localhost:8000/tasks/${props.uid}/create`,
        task
      );
      if (response.status === 200 || response.status === 201) {
        task.priority = props.taskset;
        props.newTask(false, task);
        console.log(props.uid);
      } else {
        throw new Error("Failed to create task");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="Body">
      <form action="post" onSubmit={submit} className="Body-Container">
        <label htmlFor="name">Task Name</label>
        <input
          type="text"
          name="name"
          placeholder="Task Name"
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="description">Task Description</label>
        <textarea
          name="description"
          placeholder="Task Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <label htmlFor="dueDate">Task Due Date</label>
        <input
          type="date"
          name="dueDate"
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
};

export default TaskForm;
