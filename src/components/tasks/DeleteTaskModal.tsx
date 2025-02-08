import { Modal, Text, Button, Stack, Group } from "@mantine/core";
import { Task } from "./models";
import classes from "./NewTaskModal.module.css";

export function DeleteTaskModal({
  onConfirm,
  onCancel,
  task,
}: {
  onConfirm: () => void;
  onCancel: () => void;
  task: Task | null;
}) {
  return (
    <>
      <Modal
        opened={task !== null}
        onClose={onCancel}
        title="Delete Task"
        classNames={{
          content: classes.modal,
          header: classes.header,
        }}
      >
        <Stack>
          <Text>Are you sure you want to delete this task?</Text>
          <Text>This action cannot be undone.</Text>
          <Group justify="flex-end">
            <Button variant="subtle" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onConfirm}>Delete</Button>
          </Group>
        </Stack>
      </Modal>
    </>
  );
}
