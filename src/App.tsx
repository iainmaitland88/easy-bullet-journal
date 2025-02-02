import { Header } from "./components/header/Header";
import { Container } from "@mantine/core";
import { TaskList } from "./components/tasks/TaskList";
import { NewTaskModal } from "./components/tasks/NewTaskModal";
import { useEffect, useState } from "react";
import { Task } from "./components/tasks/models";
import * as db from "./lib/db";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await db.getAllTasks();
        setTasks(savedTasks);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };
    loadTasks();
  }, []);

  const addTask = async (task: Task) => {
    try {
      await db.addTask(task);
      setTasks([...tasks, task]);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  const completeTask = async (task: Task) => {
    try {
      await db.updateTask(task);
      setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
    } catch (error) {
      console.error("Failed to complete task:", error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <TaskList tasks={tasks} onCompleteTask={completeTask} />
        <NewTaskModal onSubmit={addTask} />
      </Container>
    </>
  );
}

export default App;
