import { List } from "@mui/material";
import { styled } from "@mui/material/styles";

export const Sidebar = styled(List)`
  width: 25.6rem;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    width: 20rem;
  }
`;
