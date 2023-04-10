import { styled } from "@mui/material/styles";

export const AppMain = styled("main")`
  position: relative;

  .sticky-header & {
    padding-top: var(--app-header-height);
  }

  // layout for slate editor
  body.editor & {
    padding-right: var(--toolbar-width);
  }
`;
