import React, { MouseEventHandler, useEffect, useState } from "react";

import { EntityId, Task as APITask } from "../types/.d";
import Task from "./Task";

interface ProjectProps {
  id: EntityId;
  name: string;
  onProjectDeleted: (id: EntityId) => void;
  tasks: APITask[];
}

const Project = ({ id, name, onProjectDeleted, tasks }: ProjectProps) => {
  const handleDeleteButtonClick: MouseEventHandler = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/v1/projects/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => onProjectDeleted(data))
      .catch((error) => console.log(error));
  };
  return (
    <div>
      <>
        <h2>{name}</h2>
        <button onClick={handleDeleteButtonClick}>Delete Project </button>
        {tasks.length === 0 && "There are no tasks."}
        {tasks.map(({ id, isCompleted, label }) => (
          <Task id={id} isCompleted={isCompleted} label={label} />
        ))}
      </>
    </div>
  );
};

export default Project;
