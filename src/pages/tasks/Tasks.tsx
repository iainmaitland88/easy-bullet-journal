import { Header } from "../../components/header/Header";
import { Button, Container, Group, Kbd, Tooltip } from "@mantine/core";
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
import { useHotkeys } from "@mantine/hooks";

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

  const tasks = useTasksForDate(targetDate);

  return (
    <>
      <Header />
      <Container>
        <Group justify="space-between" mb="md">
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
        {tasks && <TaskList date={targetDate} tasks={tasks} />}
        <NewTaskModal date={targetDate} />
      </Container>
    </>
  );
}
