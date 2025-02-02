import { Modal, TextInput, Button, Stack, Group } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import { Task } from "./models";

type FormValues = {
  description: string;
};

export function NewTaskModal({ onSubmit }: { onSubmit: (task: Task) => void }) {
  useHotkeys([["mod+N", () => open()]]);

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
    onSubmit(new Task(values.description));
    form.reset();
    close();
  };

  const handleClose = () => {
    form.reset();
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={handleClose} title="New Task">
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
