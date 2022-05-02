import React, {
  FormEventHandler,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";

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
        name: taskLabelEntryText,
      }),
    })
      .then((res) => res.json())
      .then((data) => onProjectChanged(data))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <>
        <h2>{name}</h2>
        <button onClick={handleDeleteButtonClick}>Delete Project</button>
        <form onSubmit={onSubmit}>
          <label htmlFor="New Task">New Task</label>
          <input
            type="text"
            id="New Task"
            value={taskLabelEntryText}
            onChange={(e) => setTasklabelEntryText(e.target.value)}
          />
        </form>
        {tasks.length === 0 && "There are no tasks."}
        {tasks.map(({ id, is_completed, label }) => (
          <Task id={id} isCompleted={is_completed} label={label} />
        ))}
      </>
    </div>
  );
};

export default Project;
