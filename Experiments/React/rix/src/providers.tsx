import type { ReactNode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { DndContext } from "@dnd-kit/core";
import CssBaseline from "@mui/material/CssBaseline";

interface ProvidersProps {
  children: ReactNode;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff4800",
    },
    secondary: {
      main: "#10b9a0",
    },
    background: {
      default: "#F9FAFC",
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider theme={theme}>
      <DndContext>
        <CssBaseline />
        {children}
      </DndContext>
    </ThemeProvider>
  );
}
