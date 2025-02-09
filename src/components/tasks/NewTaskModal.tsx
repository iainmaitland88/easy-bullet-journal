import { Modal, TextInput, Button, Stack, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import classes from "./NewTaskModal.module.css";
import { db } from "../../lib/db";

type FormValues = {
  description: string;
};

export function NewTaskModal({ date }: { date: Date }) {
  useHotkeys([["ctrl+N", () => open()]]);

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

  const [opened, { open, close }] = useDisclosure(false);

  const handleSubmit = async (values: FormValues) => {
    await db.tasks.add({
      description: values.description,
      date,
      completed: false,
    });
    form.reset();
    close();
  };

  const handleClose = () => {
    form.reset();
    close();
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
