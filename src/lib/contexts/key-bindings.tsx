import { Kbd } from "@mantine/core";
import { createContext } from "react";

export const defaultKeyBindings = {
  "previous day": { key: "h", label: "Previous day" },
  "next day": { key: "l", label: "Next day" },
  "new task": { key: "o", label: "New task" },
  today: { key: "0", label: "Today" },
} as const;

type KeyBinding = {
  key: string;
  label: string;
};

type KeyBindings = Record<keyof typeof defaultKeyBindings, KeyBinding>;

type KeyBindingsContextType = {
  keyBindings: KeyBindings;
  updateKeyBinding: (action: keyof KeyBindings, newBinding: KeyBinding) => void;
};

export const KeyBindingsContext = createContext<KeyBindingsContextType>({
  keyBindings: defaultKeyBindings,
  updateKeyBinding: () => {},
});

export const formattedKeyBinding = (keyBinding: KeyBinding) => {
  return keyBinding.key
    .toLowerCase()
    .split("+")
    .map((k) => k.trim())
    .map((k) => (
      <>
        <Kbd>{k}</Kbd>{" "}
      </>
    ))
    .reduce((prev, curr) => (
      <>
        {prev}
        {prev && "+ "}
        {curr}
      </>
    ));
};
