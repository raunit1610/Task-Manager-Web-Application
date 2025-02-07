import React from "react";
import axios from "axios";

const EditTask = (props) => {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [dueDate, setDueDate] = React.useState("");

  async function submit(e) {
    e.preventDefault();
    try {
      if (!props.id) {
        throw new Error("Task ID is missing");
      }
      const data = {
        name: name,
        description: description,
        dueDate: dueDate,
      };
      const response = await axios.put(
        `http://localhost:8000/tasks/${props.uid}/update/${props.id}`,
        data
      );
      if (response.status === 200) {
        props.newTask(data);
        console.log(data);
      } else {
        throw new Error("Failed to update task");
      }
    } catch (error) {
      console.error("Error Updating Task:", error);
    }
  }
  return (
    <div className="Body">
      <form action="put" onSubmit={submit} className="Body-Container">
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
        <button type="submit">Edit Task</button>
      </form>
    </div>
  );
};

export default EditTask;
