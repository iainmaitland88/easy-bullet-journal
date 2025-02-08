import { IconTrashX } from "@tabler/icons-react";
import { Task } from "./models";
import { Button, Checkbox, Group, Paper, Text, Tooltip } from "@mantine/core";
import { useState } from "react";
import classes from "./TaskList.module.css";

function TaskListItem({
  task,
  onCompleteTask,
  onDeleteTask,
}: {
  task: Task;
  onCompleteTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Paper
      className={classes.taskItem}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Group justify="space-between">
        <Group>
          <Tooltip
            label={task.completed ? "Mark as incomplete" : "Mark as complete"}
            withArrow
          >
            <div>
              <Checkbox
                defaultChecked={task.completed}
                onChange={(e) => {
                  e.stopPropagation();
                  onCompleteTask(task.toggleCompleted());
                }}
              />
            </div>
          </Tooltip>
          <span
            style={{
              textDecoration: task.completed ? "line-through" : "none",
              color: task.completed ? "var(--mantine-color-dark-3)" : "inherit",
            }}
          >
            {task.description}
          </span>
        </Group>
        <Group
          gap="xs"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 200ms ease",
          }}
        >
          <Button
            variant="subtle"
            size="xs"
            px={4}
            onClick={() => onDeleteTask(task)}
          >
            <IconTrashX />
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}

export function TaskList({
  date,
  tasks,
  onCompleteTask,
  onDeleteTask,
}: {
  date: Date;
  tasks: Task[];
  onCompleteTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}) {
  return (
    <div>
      <Text component="h1" size="xl" fw={700} mb="md">
        {Intl.DateTimeFormat(navigator.language, { dateStyle: "full" }).format(
          date,
        )}
      </Text>
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          onCompleteTask={onCompleteTask}
          onDeleteTask={onDeleteTask}
        />
      ))}
    </div>
  );
}
