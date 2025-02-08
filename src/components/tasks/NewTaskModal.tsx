import { Modal, TextInput, Button, Stack, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { Task } from "./models";
import classes from "./NewTaskModal.module.css";

type FormValues = {
  description: string;
};

export function NewTaskModal({
  onSubmit,
  date,
}: {
  onSubmit: (task: Task) => void;
  date: Date;
}) {
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

  const handleSubmit = (values: FormValues) => {
    onSubmit(Task.create(values.description, date));
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
              key={form.values.description}
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
