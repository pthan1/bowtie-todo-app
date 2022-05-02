import React, { FormEventHandler, MouseEventHandler, useState } from "react";

import "./Project.css";
import { EntityId, Task as APITask } from "../types/.d";
import Task from "./Task";

interface ProjectProps {
  id: EntityId;
  name: string;
  onProjectChanged: (id: EntityId) => void;
  tasks: APITask[];
}

const Project = ({ id, name, onProjectChanged, tasks }: ProjectProps) => {
  const [taskLabelEntryText, setTasklabelEntryText] = useState("");

  const handleDeleteButtonClick: MouseEventHandler = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/v1/projects/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => onProjectChanged(data))
      .catch((error) => console.log(error));
  };
  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3001/api/v1/projects/${id}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: taskLabelEntryText,
      }),
    })
      .then((res) => res.json())
      .then((data) => onProjectChanged(data))
      .catch((error) => console.log(error));
  };

  return (
    <li className="grid-item">
      <>
        <article>
          <div className="project-header">
            <h2>{name}</h2>
            <button onClick={handleDeleteButtonClick}>Delete</button>
          </div>
          <hr className="horiz-rule" />
          <form onSubmit={onSubmit}>
            <label htmlFor="New Task">Add A Task</label>
            <input
              type="text"
              id="New Task"
              className="task-input"
              value={taskLabelEntryText}
              onChange={(e) => setTasklabelEntryText(e.target.value)}
            />
          </form>
          {tasks.length === 0 && "There are no tasks."}
          {tasks.map(({ id: taskId, is_complete, label }) => (
            <Task
              id={taskId}
              isComplete={is_complete}
              label={label}
              onTaskEditedOrDeleted={onProjectChanged}
              projectId={id}
            />
          ))}
        </article>
      </>
    </li>
  );
};

export default Project;
