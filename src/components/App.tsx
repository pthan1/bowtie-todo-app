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
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
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
      .then((data) => setChangedProjectIds([...changedProjectIds, data]))
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <div className="header" />
      <h1>Do It With Style</h1>
      <>
        <form onSubmit={onSubmit}>
          <div className="input-wrapper">
            <label htmlFor="name" className="form-labels">
              Add A Project
            </label>
            <input
              type="text"
              id="New Project Name"
              value={projectNameEntryText}
              onChange={(e) => setProjectNameEntryText(e.target.value)}
            />
          </div>
        </form>
        {projects.length === 0 && "There are no projects."}
        <div className="container">
          <ul className="grid">
            {projects.map(({ id, name, tasks }) => (
              <Project
                key={id}
                id={id}
                name={name}
                onProjectChanged={(id) =>
                  setChangedProjectIds([...changedProjectIds, id])
                }
                tasks={tasks}
              />
            ))}
          </ul>
        </div>
      </>
    </div>
  );
};

export default App;
