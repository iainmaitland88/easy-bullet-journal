import { DeleteTaskModal } from "../../components/tasks/DeleteTaskModal";
import { IconTrashX } from "@tabler/icons-react";
import { Button, Checkbox, Group, Paper, Tooltip } from "@mantine/core";
import { useState } from "react";
import classes from "./TaskList.module.css";
import { Task, db } from "../../lib/db";
import { useCompleteTask } from "../../lib/hooks";

function TaskListItem({
  task,
  onDelete,
  onComplete,
}: {
  task: Task;
  onDelete: (task: Task) => void;
  onComplete: (task: Task) => void;
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
                  onComplete(task);
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
            onClick={() => onDelete(task)}
          >
            <IconTrashX />
          </Button>
        </Group>
      </Group>
    </Paper>
  );
}

export function TaskList({ tasks }: { tasks: Task[] }) {
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const completeTask = useCompleteTask();

  return (
    <div>
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          onDelete={() => setTaskToDelete(task)}
          onComplete={completeTask}
        />
      ))}
      <DeleteTaskModal
        onConfirm={() => {
          if (taskToDelete) {
            db.tasks.delete(taskToDelete.id);
            setTaskToDelete(null);
          }
        }}
        onCancel={() => setTaskToDelete(null)}
        task={taskToDelete}
      />
    </div>
  );
}
