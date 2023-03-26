"use client";
import "@/modules/backend/client";
import RootStyleRegistry from "@/app/emotion";
import AuthProvider from "@/contexts/auth";
import { EditorProvider } from "@/contexts/editor";
import { theme } from "@/modules/mui-config";
import { ThemeProvider } from "@mui/material/styles";
import { PropsWithChildren } from "react";

export default function AppProviders(props: PropsWithChildren) {
  return (
    <RootStyleRegistry>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <EditorProvider>{props.children}</EditorProvider>
        </AuthProvider>
      </ThemeProvider>
      ;
    </RootStyleRegistry>
  );
}
