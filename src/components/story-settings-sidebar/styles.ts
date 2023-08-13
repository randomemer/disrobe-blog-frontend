import { Box, List, ListItemButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { listItemTextClasses } from "@mui/material/ListItemText";

export const Sidebar = styled(Box)`
  width: 25.6rem;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    width: 20rem;
  }
`;

export const SidebarItem = styled(ListItemButton<typeof Link>)`
  .${listItemTextClasses.root} * {
    font-weight: 500;
    text-transform: uppercase;
    color: ${({ selected, theme }) =>
      selected ? theme.palette.primary.main : "unset"};
  }
`;

export const SidebarTitle = styled(Typography)`
  margin-bottom: 1.8rem;
` as typeof Typography;
