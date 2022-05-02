import React, { useEffect, useState } from "react";

import { EntityId, Task as APITask } from "../types/.d";
import Task from "./Task";

interface ProjectProps {
  id: EntityId;
  name: string;
  tasks: APITask[];
}

const Project = ({ id, name, tasks }: ProjectProps) => {
  return (
    <div>
      <>
        <h2>{name}</h2>
        {tasks.length === 0 && "There are no tasks."}
        {tasks.map(({ id, isCompleted, label }) => {
          <Task id={id} isCompleted={isCompleted} label={label} />;
        })}
      </>
    </div>
  );
};

export default Project;
