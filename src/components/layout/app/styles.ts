import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const AppRoot = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const AppMain = styled("main")`
  display: flex;
  position: relative;
  flex: 1;
  overflow: auto;
`;
