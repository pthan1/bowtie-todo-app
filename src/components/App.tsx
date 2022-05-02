import { EntityId, Project as APIProject } from "../types/.d";
import React, { FormEventHandler, useEffect, useState } from "react";

import "./App.css";
import Project from "./Project";

const App = () => {
  const [projects, setProjects] = useState<APIProject[]>([]);
  const [projectNameEntryText, setProjectNameEntryText] = useState("");
  const [changedProjectIds, setChangedProjectIds] = useState<EntityId[]>([]);

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
  }, [changedProjectIds]);

  const onSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:3001/api/v1/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: projectNameEntryText,
      }),
    })
      .then((res) => res.json())
      .then((data) => setChangedProjectIds(data))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <>
        {projects.length === 0 && "There are no projects."}
        <form onSubmit={onSubmit}>
          <label htmlFor="name">New Project Name</label>
          <input
            type="text"
            id="New Project Name"
            value={projectNameEntryText}
            onChange={(e) => setProjectNameEntryText(e.target.value)}
          />
        </form>
        {projects.map(({ id, name, tasks }) => (
          <Project id={id} name={name} tasks={tasks} />
        ))}
      </>
    </div>
  );
};

export default App;
