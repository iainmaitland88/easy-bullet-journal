import { useCallback, useState } from "react";
import { KeyBindingsContext, defaultKeyBindings } from "./key-bindings";

export function KeyBindingsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [keyBindings, setKeyBindings] = useState(defaultKeyBindings);

  const updateKeyBinding = useCallback(
    (
      action: keyof typeof defaultKeyBindings,
      newBinding: { key: string; label: string },
    ) => {
      setKeyBindings((prev) => ({
        ...prev,
        [action]: newBinding,
      }));
    },
    [],
  );

  return (
    <KeyBindingsContext.Provider value={{ keyBindings, updateKeyBinding }}>
      {children}
    </KeyBindingsContext.Provider>
  );
}
