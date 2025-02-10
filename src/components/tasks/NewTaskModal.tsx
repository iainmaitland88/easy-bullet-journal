import { Modal, TextInput, Button, Stack, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import classes from "./NewTaskModal.module.css";
import { db } from "../../lib/db";

type FormValues = {
  description: string;
};

export function NewTaskModal({
  date,
  opened,
  onClose,
}: {
  date: Date;
  opened: boolean;
  onClose: () => void;
}) {
  const form = useForm<FormValues>({
    mode: "uncontrolled",
    initialValues: {
      description: "",
    },
    validate: {
      description: (value) =>
        value.length < 3 ? "Description must be at least 3 characters" : null,
    },
  });

  const handleSubmit = async (values: FormValues) => {
    await db.tasks.add({
      description: values.description,
      date,
      completed: false,
    });
    form.reset();
    onClose();
  };

  const handleClose = () => {
    form.reset();
    onClose();
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={handleClose}
        title="New Task"
        classNames={{
          content: classes.modal,
          header: classes.header,
        }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              data-autofocus
              withAsterisk
              label="Description"
              placeholder="Walk the dog"
              {...form.getInputProps("description")}
            />
            <Group justify="flex-end">
              <Button type="submit">Add</Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
