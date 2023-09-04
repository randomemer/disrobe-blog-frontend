import DefaultHeadContent from "@/components/head";
import AppHeader from "@/components/header";
import { PropsWithChildren } from "react";
import { AppMain, AppRoot } from "./styles";

export type AppLayoutProps = PropsWithChildren<{}>;

export default function AppLayout(props: AppLayoutProps) {
  return (
    <>
      <DefaultHeadContent />

      <AppRoot>
        <AppHeader position="relative" />
        <AppMain id="main">{props.children}</AppMain>
      </AppRoot>
    </>
  );
}
