import React, { MouseEventHandler, useEffect, useState } from "react";

import { EntityId } from "../types/.d";

interface TaskProps {
  id: EntityId;
  isCompleted: boolean;
  label: string;
  onTaskEditedOrDeleted: (id: EntityId) => void;
  projectId: EntityId;
}

const Task = ({
  id,
  isCompleted,
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
    <>
      <h3 style={{ textDecorationLine: isCompleted ? "line-through" : "none" }}>
        {label}
      </h3>
      <button id="delete" onClick={handleDeleteButtonClick}>
        Delete Task
      </button>
      <button id="mark-complete" onClick={handleDeleteButtonClick}>
        Mark Complete
      </button>
    </>
  );
};

export default Task;
