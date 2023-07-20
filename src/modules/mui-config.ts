import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#eee82c" },
    background: { default: "#121212" },
    error: { main: "#af1b3f" },
  },
  typography: { fontFamily: "inherit", htmlFontSize: 10 },
  components: {
    MuiTextField: {
      defaultProps: {
        variant: "standard",
      },
    },
    MuiButton: {
      defaultProps: {
        style: { borderWidth: "2px", borderRadius: "0" },
      },
    },
  },
});
