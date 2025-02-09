import { db, Task } from "../lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { startOfDay, endOfDay } from "date-fns";

export const useTasksForDate = (date: Date): Task[] | undefined => {
  return useLiveQuery(() => {
    return db.tasks
      .where("date")
      .between(startOfDay(date), endOfDay(date))
      .toArray();
  }, [date]);
};
export const useCompleteTask = () => {
  return (task: Task) => {
    return db.tasks.update(task.id, { completed: !task.completed });
  };
};
