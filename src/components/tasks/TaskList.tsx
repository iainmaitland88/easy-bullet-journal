import { Task } from "./models";
import { Checkbox, Group } from "@mantine/core";
function TaskListItem({
  task,
  onCompleteTask,
}: {
  task: Task;
  onCompleteTask: (task: Task) => void;
}) {
  return (
    <Group>
      <Checkbox
        defaultChecked={task.completed}
        onChange={(e) => {
          e.stopPropagation();
          onCompleteTask(task.toggleCompleted());
        }}
      />
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
