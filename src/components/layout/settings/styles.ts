import { Tab, Tabs } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

export const SettingsMain = styled("main")`
  position: relative;
  max-width: 120rem;
  margin: 4.8rem auto;

  display: flex;

  .sticky-header & {
    padding-top: var(--app-header-height);
  }
`;

export const SettingsTabs = styled(Tabs)``;

export const SettingsNavTab = styled(Tab<typeof Link>)`
  font-size: 1.6rem;
  font-weight: 600;
`;

export const TabContent = styled("div")`
  padding: 0 9.6rem;
  flex: 1;
`;
