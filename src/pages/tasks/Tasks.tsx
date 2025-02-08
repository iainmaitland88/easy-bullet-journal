import { Header } from "../../components/header/Header";
import { Button, Container, Group } from "@mantine/core";
import { TaskList } from "../../components/tasks/TaskList";
import { NewTaskModal } from "../../components/tasks/NewTaskModal";
import { useEffect, useState, useMemo } from "react";
import { Task } from "../../components/tasks/models";
import * as db from "../../lib/db";
import { Link, useParams } from "react-router";
import { addDays, format, parse, subDays } from "date-fns";
import {
  IconArrowBigLeftLines,
  IconArrowBigRightLines,
} from "@tabler/icons-react";

export function Tasks() {
  const { date: dateParam } = useParams();
  const [tasks, setTasks] = useState<Task[]>([]);

  const targetDate = useMemo(() => {
    if (!dateParam) return new Date();

    return parse(dateParam, "yyyy-MM-dd", new Date());
  }, [dateParam]);
  const yesterday = subDays(targetDate, 1);
  const tomorrow = addDays(targetDate, 1);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await db.getTasksByDate(targetDate);
        setTasks(savedTasks);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      }
    };
    loadTasks();
  }, [targetDate]);

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

  const deleteTask = async (task: Task) => {
    try {
      await db.deleteTask(task.id);
      setTasks(tasks.filter((t) => t.id !== task.id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Group justify="space-between" mb="md">
          <Button
            variant="subtle"
            component={Link}
            to={`/tasks/${format(yesterday, "yyyy-MM-dd")}`}
            leftSection={<IconArrowBigLeftLines />}
          >
            Yesterday
          </Button>
          <Button variant="subtle" component={Link} to={`/tasks`}>
            Today
          </Button>
          <Button
            variant="subtle"
            component={Link}
            to={`/tasks/${format(tomorrow, "yyyy-MM-dd")}`}
            rightSection={<IconArrowBigRightLines />}
          >
            Tomorrow
          </Button>
        </Group>
        <TaskList
          date={targetDate}
          tasks={tasks}
          onCompleteTask={completeTask}
          onDeleteTask={deleteTask}
        />
        <NewTaskModal onSubmit={addTask} date={targetDate} />
      </Container>
    </>
  );
}
