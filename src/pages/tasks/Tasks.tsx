import { Header } from "../../components/header/Header";
import {
  Button,
  Container,
  Group,
  Kbd,
  Loader,
  Tooltip,
  Text,
  Stack,
} from "@mantine/core";
import { TaskList } from "../../components/tasks/TaskList";
import { NewTaskModal } from "../../components/tasks/NewTaskModal";
import { useMemo } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { addDays, format, parse, subDays } from "date-fns";
import {
  IconArrowBigLeftLines,
  IconArrowBigRightLines,
} from "@tabler/icons-react";
import { useTasksForDate } from "../../lib/hooks";
import { useDisclosure, useHotkeys } from "@mantine/hooks";

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
  useHotkeys([["ctrl+n", () => navigate(nextPage)]]);
  useHotkeys([["ctrl+p", () => navigate(prevPage)]]);
  useHotkeys([["ctrl+0", () => navigate("/tasks")]]);

  const { tasks, isLoading } = useTasksForDate(targetDate);
  const [opened, { open, close }] = useDisclosure(false);
  useHotkeys([["ctrl+o", () => open()]]);

  return (
    <>
      <Header />
      <Container>
        <Stack>
          <Group justify="space-between">
            <Group>
              <Tooltip
                label={
                  <>
                    <Kbd>ctrl</Kbd> + <Kbd>p</Kbd>
                  </>
                }
              >
                <Button
                  variant="subtle"
                  component={Link}
                  to={`/tasks/${format(yesterday, "yyyy-MM-dd")}`}
                  leftSection={<IconArrowBigLeftLines />}
                >
                  Yesterday
                </Button>
              </Tooltip>
              <Tooltip
                label={
                  <>
                    <Kbd>ctrl</Kbd> + <Kbd>0</Kbd>
                  </>
                }
              >
                <Button variant="subtle" component={Link} to={`/tasks`}>
                  Today
                </Button>
              </Tooltip>
              <Tooltip
                label={
                  <>
                    <Kbd>ctrl</Kbd> + <Kbd>n</Kbd>
                  </>
                }
              >
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
            <Tooltip
              label={
                <>
                  <Kbd>ctrl</Kbd> + <Kbd>o</Kbd>
                </>
              }
            >
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
                No tasks. Try creating some with <Kbd>ctrl</Kbd> + <Kbd>o</Kbd>
              </Text>
            )}
          </Stack>
        </Stack>
        <NewTaskModal date={targetDate} opened={opened} onClose={close} />
      </Container>
    </>
  );
}
