import React from "react";

const EndAddTask = (props) => {
  function handleClick() {
    props.endTask(false);
  }
  return (
    <div className="Add-Task">
      <button onClick={handleClick} className="Add-Task-Button">
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
            d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default EndAddTask;
