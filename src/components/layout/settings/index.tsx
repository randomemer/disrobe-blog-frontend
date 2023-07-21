import AppHeader from "@/components/header";
import { PersonOutlineSharp } from "@mui/icons-material";
import { ListItemIcon, ListItemText } from "@mui/material";
import { PostOutline } from "mdi-material-ui";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { PropsWithChildren, useEffect } from "react";
import {
  SettingsMain,
  SettingsNavTab,
  SettingsTabs,
  TabContent,
} from "./styles";

const routes = [
  { label: "Profile", path: "profile", icon: <PersonOutlineSharp /> },
  { label: "Posts", path: "posts", icon: <PostOutline /> },
];

export default function SettingsLayout(props: PropsWithChildren) {
  const router = useRouter();

  // useEffect(() => {
  //   document.body.classList.add("sticky-header");

  //   return () => {
  //     document.body.classList.remove("sticky-header");
  //   };
  // }, []);

  return (
    <>
      <Head>
        <title>Disrobe</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <AppHeader />
      <SettingsMain>
        <SettingsTabs>
          {routes.map((route) => (
            <SettingsNavTab
              dense
              key={route.path}
              component={Link}
              selected={router.asPath.includes(`/settings/${route.path}`)}
              href={`/settings/${route.path}`}
            >
              <ListItemIcon>{route.icon}</ListItemIcon>
              <ListItemText>{route.label}</ListItemText>
            </SettingsNavTab>
          ))}
        </SettingsTabs>
        <TabContent>{props.children}</TabContent>
      </SettingsMain>
    </>
  );
}
