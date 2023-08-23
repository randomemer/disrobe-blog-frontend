import { Box, ListItemButton, Typography } from "@mui/material";
import { listItemTextClasses } from "@mui/material/ListItemText";
import { styled } from "@mui/material/styles";
import Link from "next/link";

export const Sidebar = styled(Box)`
  width: 25.6rem;
  align-self: flex-start;
  position: sticky;
  top: 4.8rem;

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
