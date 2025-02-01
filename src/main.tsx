import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "@mantine/core/styles.css";

import { createTheme, MantineProvider } from "@mantine/core";

// Your theme configuration is merged with default theme
const theme = createTheme({
  fontFamily: "Montserrat, sans-serif",
  defaultRadius: "md",
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <App />
    </MantineProvider>
  </StrictMode>,
);
