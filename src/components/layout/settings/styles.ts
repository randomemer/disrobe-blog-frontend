import { Box, List, ListItemButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { listItemIconClasses } from "@mui/material/ListItemIcon";
import { listItemTextClasses } from "@mui/material/ListItemText";
import Link from "next/link";

export const SettingsRoot = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const SettingsContainer = styled(Box)`
  flex: 1;
  overflow: auto;
`;

export const SettingsMain = styled("main")`
  display: flex;
  max-width: 120rem;
  margin: 4.8rem auto;
`;

export const SettingsTabs = styled(List)`
  width: 25.6rem;
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
  padding: 0 9.6rem;
  flex: 1;
`;
