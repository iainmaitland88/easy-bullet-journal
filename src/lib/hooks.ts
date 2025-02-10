import { db, Task } from "../lib/db";
import { useLiveQuery } from "dexie-react-hooks";
import { startOfDay, endOfDay } from "date-fns";
import { useState } from "react";

export const useTasksForDate = (
  date: Date
): { tasks: Task[] | undefined; isLoading: boolean } => {
  const [isLoading, setIsLoading] = useState(true);

  const tasks = useLiveQuery(() => {
    try {
      return db.tasks
        .where("date")
        .between(startOfDay(date), endOfDay(date))
        .toArray();
    } finally {
      setIsLoading(false);
    }
  }, [date]);

  return { tasks, isLoading };
};

export const useCompleteTask = () => {
  return (task: Task) => {
    return db.tasks.update(task.id, { completed: !task.completed });
  };
};
