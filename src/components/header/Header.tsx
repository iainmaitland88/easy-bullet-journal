import { Container, Group, Button } from "@mantine/core";
import { useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import { useHotkeys } from "@mantine/hooks";

export function Header() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const toggleColorScheme = () =>
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");

  useHotkeys([["ctrl+L", () => toggleColorScheme()]]);

  return (
    <header>
      <Container fluid py={16}>
        <Group gap={5} justify="flex-end">
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
