import { EntityId, Project as APIProject } from "../types/.d";
import React, { useEffect, useState } from "react";

import "./App.css";
import Project from "./Project";

const App = () => {
  const [projects, setProjects] = useState<APIProject[]>([]);
  const [newProjectName, setNewProjectName] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/api/v1/projects")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.length !== 0) {
          setProjects(data);
        }
      })
      .catch((error) => console.log(error));
  }, []);
  return (
    <div className="App">
      <>
        {projects.length === 0 && "There are no projects."}
        {projects.map(({ id, name, tasks }) => {
          <Project id={id} name={name} tasks={tasks} />;
        })}
      </>
    </div>
  );
};

export default App;
