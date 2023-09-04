import DefaultHeadContent from "@/components/head";
import AppHeader from "@/components/header";
import { theme } from "@/modules/mui-config";
import {
  ChevronLeftSharp,
  PersonOutlineSharp,
  Settings,
} from "@mui/icons-material";
import {
  Button,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { PostOutline } from "mdi-material-ui";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, useState } from "react";
import {
  CloseButton,
  MainWrapper,
  SettingsContainer,
  SettingsDrawer,
  SettingsMain,
  SettingsNavTab,
  SettingsRoot,
  SettingsTabs,
  SettingsToolbar,
  TabContent,
} from "./styles";

const routes = [
  { label: "Profile", path: "profile", icon: <PersonOutlineSharp /> },
  { label: "Posts", path: "posts", icon: <PostOutline /> },
];

export default function SettingsLayout(props: PropsWithChildren) {
  const router = useRouter();
  const isDownMd = useMediaQuery(theme.breakpoints.down("md"));
  const [isMenuOpen, setMenuOpen] = useState(false);

  const onMenuClose = () => setMenuOpen(false);

  const SettingsNav = (
    <SettingsTabs>
      {routes.map((route) => (
        <SettingsNavTab
          dense
          key={route.path}
          component={Link}
          selected={router.asPath.includes(`/me/${route.path}`)}
          href={`/me/${route.path}`}
        >
          <ListItemIcon>{route.icon}</ListItemIcon>
          <ListItemText>{route.label}</ListItemText>
        </SettingsNavTab>
      ))}
    </SettingsTabs>
  );

  return (
    <>
      <DefaultHeadContent />

      <SettingsRoot>
        <AppHeader position="relative" />
        <SettingsContainer>
          {/* Display Toolbar & Drawer if below MD */}
          {isDownMd && (
            <>
              <SettingsToolbar>
                <Button
                  color="inherit"
                  startIcon={<Settings />}
                  onClick={() => setMenuOpen(true)}
                >
                  Menu
                </Button>
              </SettingsToolbar>
              <SettingsDrawer open={isMenuOpen} onClose={onMenuClose}>
                <CloseButton onClick={onMenuClose}>
                  <ChevronLeftSharp />
                </CloseButton>
                {SettingsNav}
              </SettingsDrawer>
            </>
          )}

          <MainWrapper>
            <SettingsMain component="main">
              {!isDownMd && SettingsNav}
              <TabContent>{props.children}</TabContent>
            </SettingsMain>
          </MainWrapper>
        </SettingsContainer>
      </SettingsRoot>
    </>
  );
}
