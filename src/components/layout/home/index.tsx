import Footer from "@/components/footer";
import AppHeader from "@/components/header";
import { PropsWithChildren } from "react";
import { Main } from "./styles";

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
