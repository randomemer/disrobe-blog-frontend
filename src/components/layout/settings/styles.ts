import { Box, Drawer, IconButton, List, ListItemButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";
import { elevation } from "@/styles/shared";
import { listItemIconClasses } from "@mui/material/ListItemIcon";
import { listItemTextClasses } from "@mui/material/ListItemText";
import { paperClasses } from "@mui/material/Paper";

export const SettingsRoot = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const SettingsContainer = styled(Box)`
  position: relative;
  flex: 1;
  overflow: auto;
`;
export const MainWrapper = styled(Box)`
  padding: 4.8rem 6.4rem;

  ${({ theme }) => theme.breakpoints.down("md")} {
    padding: 3.6rem 4.8rem;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 3.6rem 3rem;
  }
`;

export const SettingsMain = styled(Box)`
  position: relative;
  display: flex;
  max-width: 120rem;
  margin: 0 auto;
  gap: 7.2rem;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    gap: 6.4rem;
  }
`;

export const SettingsTabs = styled(List)`
  width: 25.6rem;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    width: 20rem;
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 25.6rem;
    flex: 1;
    overflow-y: auto;
  }
`;

export const SettingsNavTab = styled(ListItemButton<typeof Link>)`
  display: flex;
  gap: 1.4rem;
  font-weight: 600;

  .${listItemIconClasses.root} {
    color: ${({ selected, theme }) =>
      selected ? theme.palette.primary.main : "unset"};
    min-width: unset;
  }

  .${listItemTextClasses.root} * {
    color: ${({ selected, theme }) =>
      selected ? theme.palette.primary.main : "unset"};
    font-weight: 600;
    text-transform: uppercase;
  }
`;

export const TabContent = styled("div")`
  flex: 1;
`;

export const SettingsDrawer = styled(Drawer)`
  .${paperClasses.root} {
    padding: 0.9rem 0 1.8rem;
    /* display: flex;
    flex-direction: column; */
  }
`;

export const SettingsToolbar = styled(Box)`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  padding: 0.9rem 2.4rem;
  ${elevation(0.05)}
  z-index: 5;
`;

export const CloseButton = styled(IconButton)`
  align-self: flex-end;
  margin-right: 1.2rem;
`;
