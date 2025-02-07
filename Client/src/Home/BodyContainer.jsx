import React from "react";

const BodyContainer = (props) => {
  function handleDelete() {
    props.deleteTask(props.id);
  }
  function handleEdit() {
    if (props.currentEdit) {
      props.editTask(false, props.id);
    } else {
      props.editTask(true, props.id);
    }
  }
  return (
    <div className="Body-Container">
      <p className="task-prior">
        {props.priority}{" "}
        <button className="task-complete" onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
        <button className="task-edit" onClick={handleEdit}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
            />
          </svg>
        </button>
        <button className="task-delete" onClick={handleDelete}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
            />
          </svg>
        </button>
      </p>
      <h4 className="task-name">{props.name}</h4>
      <p className="task-desc">{props.description}</p>

      <div className="task-due-date">
        <span className="due-date-icon">📅</span>
        <span className="due-date-text">
          {new Date(props.dueDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })}
        </span>
      </div>

      <div className="task-status">
        <div
          className="status-bar"
          style={{
            width: `${props.status}%`,
            height: "20px",
            backgroundColor: "rgb(54, 152, 165)",
            borderRadius: "5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {`${props.status}%`}
        </div>
      </div>
    </div>
  );
};

export default BodyContainer;
