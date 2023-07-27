import { theme } from "@/modules/mui-config";
import { css } from "@emotion/react";

theme.typography.h1 = {
  fontSize: "4.8rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "4.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "3.2rem",
  },
};

theme.typography.h2 = {
  fontSize: "4.2rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "3.8rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "3rem",
  },
};

theme.typography.h3 = {
  fontSize: "3.6rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "3.2rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.8rem",
  },
};

theme.typography.h4 = {
  fontSize: "3rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "2.7rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.4rem",
  },
};

theme.typography.h5 = {
  fontSize: "2.4rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "2.3rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "2.2rem",
  },
};

theme.typography.h6 = {
  fontSize: "2rem",
  [theme.breakpoints.down("lg")]: {
    fontSize: "1.95rem",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "1.9rem",
  },
};

const globalStyles = css`
  :root {
    --app-header-height: 7.2rem;

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

  html,
  body,
  #__next {
    width: 100%;
    height: 100%;
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
