import AppProviders from "@/app/providers";
import { PropsWithChildren } from "react";
import "@/styles/globals.scss";

export default function RootLayout(props: PropsWithChildren) {
  return (
    <html>
      <body>
        <AppProviders>{props.children}</AppProviders>
      </body>
    </html>
  );
}
