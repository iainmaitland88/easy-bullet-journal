import { Container, Group, Image, Button, Text } from "@mantine/core";
import { useMantineColorScheme, useComputedColorScheme } from "@mantine/core";
import { IconSun, IconMoon } from "@tabler/icons-react";
import classes from "./Header.module.css";

export function Header() {
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light");
  const toggleColorScheme = () =>
    setColorScheme(computedColorScheme === "dark" ? "light" : "dark");

  return (
    <header className={classes.header}>
      <Container>
        <Group justify="space-between">
        <Group>
          <Image
            src="/easy-bullet-journal.svg"
            alt="Easy Bullet Journal"
            height={32}
          />
          <Text>Easy Bullet Journal</Text>
        </Group>
        <Group gap={5}>
          <Button
            onClick={() => toggleColorScheme()}
            variant="subtle"
            size="xs"
            color={computedColorScheme === "dark" ? "orange" : "blue"}
          >
            {computedColorScheme === "dark" ? <IconSun /> : <IconMoon />}
          </Button>
          </Group>
        </Group>
      </Container>
    </header>
  );
}
