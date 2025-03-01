import {
  Button,
  Container,
  Group,
  Loader,
  Stack,
  Text,
  Tooltip,
} from "@mantine/core";
import { useDisclosure, useHotkeys } from "@mantine/hooks";
import {
  IconArrowBigLeftLines,
  IconArrowBigRightLines,
} from "@tabler/icons-react";
import { addDays, format, parse, subDays } from "date-fns";
import { useContext, useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { Header } from "../../components/header/Header";
import { NewTaskModal } from "../../components/tasks/NewTaskModal";
import { TaskList } from "../../components/tasks/TaskList";
import {
  formattedKeyBinding as formatKeyBinding,
  KeyBindingsContext,
} from "../../lib/contexts/key-bindings";
import { useTasksForDate } from "../../lib/hooks";

export function Tasks() {
  const { date: dateParam } = useParams();
  const targetDate = useMemo(() => {
    if (!dateParam) return new Date();

    return parse(dateParam, "yyyy-MM-dd", new Date());
  }, [dateParam]);
  const yesterday = subDays(targetDate, 1);
  const tomorrow = addDays(targetDate, 1);
  const nextPage = `/tasks/${format(tomorrow, "yyyy-MM-dd")}`;
  const prevPage = `/tasks/${format(yesterday, "yyyy-MM-dd")}`;

  const navigate = useNavigate();
  const { keyBindings } = useContext(KeyBindingsContext);
  useHotkeys([[keyBindings["next day"].key, () => navigate(nextPage)]]);
  useHotkeys([[keyBindings["previous day"].key, () => navigate(prevPage)]]);
  useHotkeys([[keyBindings["today"].key, () => navigate("/tasks")]]);

  const { tasks, isLoading } = useTasksForDate(targetDate);
  const [opened, { open, close }] = useDisclosure(false);
  useHotkeys([[keyBindings["new task"].key, () => open()]]);

  return (
    <>
      <Header />
      <Container>
        <Stack>
          <Group justify="space-between">
            <Group>
              <Tooltip label={formatKeyBinding(keyBindings["previous day"])}>
                <Button
                  variant="subtle"
                  component={Link}
                  to={`/tasks/${format(yesterday, "yyyy-MM-dd")}`}
                  leftSection={<IconArrowBigLeftLines />}
                >
                  Yesterday
                </Button>
              </Tooltip>
              <Tooltip label={formatKeyBinding(keyBindings["today"])}>
                <Button variant="subtle" component={Link} to={`/tasks`}>
                  Today
                </Button>
              </Tooltip>
              <Tooltip label={formatKeyBinding(keyBindings["next day"])}>
                <Button
                  variant="subtle"
                  component={Link}
                  to={`/tasks/${format(tomorrow, "yyyy-MM-dd")}`}
                  rightSection={<IconArrowBigRightLines />}
                >
                  Tomorrow
                </Button>
              </Tooltip>
            </Group>
            <Tooltip label={formatKeyBinding(keyBindings["new task"])}>
              <Button variant="subtle" disabled={isLoading} onClick={open}>
                New Task
              </Button>
            </Tooltip>
          </Group>
          {isLoading && <Loader />}
          <Stack>
            <Group justify="space-between">
              <Text component="h1" size="xl" fw={700}>
                {Intl.DateTimeFormat(navigator.language, {
                  dateStyle: "full",
                }).format(targetDate)}
              </Text>
            </Group>
            {tasks && tasks.length > 0 ? (
              <TaskList tasks={tasks} />
            ) : (
              <Text size="sm" c="dimmed">
                No tasks. Try creating some with{" "}
                {formatKeyBinding(keyBindings["new task"])}
              </Text>
            )}
          </Stack>
        </Stack>
        <NewTaskModal date={targetDate} opened={opened} onClose={close} />
      </Container>
    </>
  );
}
