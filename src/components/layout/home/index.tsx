import Head from "next/head";
import AppHeader from "@/components/header";
import { Main } from "./styles";
import { PropsWithChildren } from "react";
import Footer from "@/components/footer";
import DefaultHeadContent from "@/components/head";

export type BlogLayoutProps = PropsWithChildren<{}>;

export default function BlogLayout(props: BlogLayoutProps) {
  return (
    <>
      <AppHeader position="dynamic" />
      <Main id="main">{props.children}</Main>
      <Footer />
    </>
  );
}
