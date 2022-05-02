export type EntityId = number | string | null | undefined;

export interface Entity {
  id: EntityId;
}

export interface Project extends Entity {
  name: string;
  tasks: Task[];
}

export interface Task extends Entity {
  is_complete: boolean;
  label: string;
}
