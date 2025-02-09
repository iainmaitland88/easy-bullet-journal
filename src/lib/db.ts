import Dexie, { type EntityTable } from "dexie";

interface Task {
  id: string;
  description: string;
  completed: boolean;
  date: Date;
}

const db = new Dexie("tasks") as Dexie & {
  tasks: EntityTable<Task, "id">;
};

db.version(1).stores({
  tasks: "++id, description, completed, date",
});

export type { Task };
export { db };
