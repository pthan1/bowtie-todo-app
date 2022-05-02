import React, { MouseEventHandler } from "react";

import "./Task.css";
import { EntityId } from "../types/.d";

interface TaskProps {
  id: EntityId;
  isComplete: boolean;
  label: string;
  onTaskEditedOrDeleted: (id: EntityId) => void;
  projectId: EntityId;
}

const Task = ({
  id,
  isComplete,
  label,
  onTaskEditedOrDeleted,
  projectId,
}: TaskProps) => {
  const handleDeleteButtonClick: MouseEventHandler = (e) => {
    e.preventDefault();
    const action: string = e.currentTarget.id;
    fetch(`http://localhost:3001/api/v1/projects/${projectId}/tasks/${id}`, {
      method: action === "delete" ? "DELETE" : "PUT",
    })
      .then((res) => res.json())
      .then((data) => onTaskEditedOrDeleted(data))
      .catch((error) => console.log(error));
  };
  return (
    <div className="task-list">
      <>
        <div className="task-header">
          <p
            style={{ textDecorationLine: isComplete ? "line-through" : "none" }}
          >
            {label}
          </p>
          <div className="task-button-container">
            <button id="mark-complete" onClick={handleDeleteButtonClick}>
              Mark Complete
            </button>
            <button id="delete" onClick={handleDeleteButtonClick}>
              Delete Task
            </button>
          </div>
        </div>
      </>
    </div>
  );
};

export default Task;
