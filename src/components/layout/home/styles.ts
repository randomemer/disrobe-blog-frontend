import { styled } from "@mui/material/styles";

export const Main = styled("main")`
  position: relative;

  .sticky-header & {
    padding-top: var(--app-header-height);
  }
`;
