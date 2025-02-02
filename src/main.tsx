import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";

const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  defaultRadius: "md",
  colors: {
    dark: [
      "#C1C2C5", // 0
      "#A6A7AB", // 1
      "#909296", // 2
      "#5C5F66", // 3
      "#373A40", // 4
      "#2C2E33", // 5 - Main background
      "#25262B", // 6 - Secondary background
      "#1A1B1E", // 7 - Darker sections
      "#141517", // 8 - Deepest background
      "#101113", // 9
    ],
    magenta: [
      "#ffe9f6",
      "#ffd1e6",
      "#faa1c9",
      "#f66eab",
      "#f24391",
      "#f02981",
      "#f01879",
      "#d60867",
      "#c0005c",
      "#a9004f",
    ],
  },
  primaryColor: "magenta",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <App />
    </MantineProvider>
  </StrictMode>
);
