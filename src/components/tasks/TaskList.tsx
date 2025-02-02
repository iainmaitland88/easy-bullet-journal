import { Task } from "./models";
import { Checkbox, Group, Tooltip } from "@mantine/core";
function TaskListItem({
  task,
  onCompleteTask,
}: {
  task: Task;
  onCompleteTask: (task: Task) => void;
}) {
  return (
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
        style={{ textDecoration: task.completed ? "line-through" : "none" }}
      >
        {task.description}
      </span>
    </Group>
  );
}

export function TaskList({
  tasks,
  onCompleteTask,
}: {
  tasks: Task[];
  onCompleteTask: (task: Task) => void;
}) {
  return (
    <div>
      <h1>Tasks</h1>
      {tasks.map((task) => (
        <TaskListItem
          key={task.id}
          task={task}
          onCompleteTask={onCompleteTask}
        />
      ))}
    </div>
  );
}
