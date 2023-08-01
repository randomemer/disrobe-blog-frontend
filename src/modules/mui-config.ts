import { createTheme } from "@mui/material/styles";
import { DM_Sans } from "next/font/google";

const DMSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#eee82c" },
  },
  typography: { fontFamily: "inherit", htmlFontSize: 10 },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        body {
          font-family: ${DMSans.style.fontFamily}, sans-serif;
          line-height: 1;
        }

        *,
        *::after,
        *::before {
          margin: 0;
          padding: 0;
        }
      `,
    },
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
