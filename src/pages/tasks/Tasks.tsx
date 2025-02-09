import { Header } from "../../components/header/Header";
import { Button, Container, Group } from "@mantine/core";
import { TaskList } from "../../components/tasks/TaskList";
import { NewTaskModal } from "../../components/tasks/NewTaskModal";
import { useMemo } from "react";
import { Link, useParams } from "react-router";
import { addDays, format, parse, subDays } from "date-fns";
import {
  IconArrowBigLeftLines,
  IconArrowBigRightLines,
} from "@tabler/icons-react";
import { useTasksForDate } from "../../lib/hooks";

export function Tasks() {
  const { date: dateParam } = useParams();
  const targetDate = useMemo(() => {
    if (!dateParam) return new Date();

    return parse(dateParam, "yyyy-MM-dd", new Date());
  }, [dateParam]);
  const yesterday = subDays(targetDate, 1);
  const tomorrow = addDays(targetDate, 1);

  const tasks = useTasksForDate(targetDate);

  return (
    <>
      <Header />
      <Container>
        <Group justify="space-between" mb="md">
          <Button
            variant="subtle"
            component={Link}
            to={`/tasks/${format(yesterday, "yyyy-MM-dd")}`}
            leftSection={<IconArrowBigLeftLines />}
          >
            Yesterday
          </Button>
          <Button variant="subtle" component={Link} to={`/tasks`}>
            Today
          </Button>
          <Button
            variant="subtle"
            component={Link}
            to={`/tasks/${format(tomorrow, "yyyy-MM-dd")}`}
            rightSection={<IconArrowBigRightLines />}
          >
            Tomorrow
          </Button>
        </Group>
        {tasks && <TaskList date={targetDate} tasks={tasks} />}
        <NewTaskModal date={targetDate} />
      </Container>
    </>
  );
}
