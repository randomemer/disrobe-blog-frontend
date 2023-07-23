import { theme } from "@/modules/mui-config";
import { css } from "@emotion/react";

const globalStyles = css`
  :root {
    --app-header-height: 7.2rem;
    --toolbar-width: 30rem;

    ${theme.breakpoints.down("md")} {
      --app-header-height: 6.4rem;
    }
  }

  html {
    font-size: 10px;
    font-size: 62.5%;
    overflow-x: hidden;

    ${theme.breakpoints.down("md")} {
      font-size: 9px;
    }
  }

  body {
    width: 100%;
  }

  *::placeholder {
    color: rgba(187, 187, 187, 0.5);
    opacity: 1;
  }

  input,
  textarea,
  button {
    border: none;
    font-family: inherit;
    color: inherit;
    background-color: inherit;
  }

  button {
    cursor: pointer;
    background: none;
  }

  a {
    text-decoration: none;
  }

  *:focus {
    outline: none;
  }

  img {
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
    font-size: 0;
  }
`;

export default globalStyles;
