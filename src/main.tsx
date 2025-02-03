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
      "#D1D5DB", // 0 - Lightest
      "#9CA3AF", // 1
      "#6B7280", // 2
      "#4B5563", // 3
      "#374151", // 4
      "#0A101C", // 5 - Secondary background
      "#030712", // 6 - Main background
      "#010510", // 7 - Darker sections
      "#01040E", // 8 - Deepest background
      "#00030C", // 9 - Darkest
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
  </StrictMode>,
);
