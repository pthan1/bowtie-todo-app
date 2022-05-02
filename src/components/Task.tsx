import React, { useEffect, useState } from "react";

import { EntityId } from "../types/.d";

interface TaskProps {
  id: EntityId;
  isCompleted: boolean;
  label: string;
}

const Task = ({ id, isCompleted, label }: TaskProps) => {
  return <>'Hello'</>;
};

export default Task;
