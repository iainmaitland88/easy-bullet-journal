import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";
import "./global.module.css";

import { createTheme, MantineProvider, Modal } from "@mantine/core";

const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  defaultRadius: "md",
  colors: {
    dark: [
      "#D1D5DB",
      "#9CA3AF",
      "#6B7280",
      "#4B5563",
      "#374151",
      "#0A101C",
      "#030712",
      "#010510",
      "#01040E",
      "#00030C",
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
  components: {
    Modal: Modal.extend({
      defaultProps: {
        overlayProps: {
          blur: 3,
          backgroundOpacity: 0.55,
        },
      },
    }),
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <App />
    </MantineProvider>
  </StrictMode>,
);
