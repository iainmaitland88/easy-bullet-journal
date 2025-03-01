import {
  Button,
  Container,
  Group,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { IconAdjustments, IconMoon, IconSun } from "@tabler/icons-react";
import { Link } from "react-router";

export function Header() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const toggleColorScheme = () =>
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");

  return (
    <header>
      <Container fluid py={16}>
        <Group gap={5} justify="flex-end">
          <Button
            component={Link}
            to="/settings"
            variant="subtle"
            size="xs"
            color="gray"
          >
            <IconAdjustments />
          </Button>
          <Button
            onClick={() => toggleColorScheme()}
            variant="subtle"
            size="xs"
            color={computedColorScheme === "dark" ? "orange" : "blue"}
          >
            {computedColorScheme === "dark" ? <IconSun /> : <IconMoon />}
          </Button>
        </Group>
      </Container>
    </header>
  );
}
