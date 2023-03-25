import { Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

export const SettingsMain = styled("main")`
  position: relative;
  background-color: purple;
  max-width: 120rem;
  margin: 4.8rem auto;

  display: flex;

  .sticky-header & {
    padding-top: var(--app-header-height);
  }
`;

export const SettingsTabs = styled(Tabs)`
  /* background-color: aqua; */
`;

export const SettingsNavTab = styled(Tab<typeof Link>)``;
