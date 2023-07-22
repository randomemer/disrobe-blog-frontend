import AppSnackbar from "@/components/snackbar";
import AuthProvider from "@/contexts/auth";
import { EditorProvider } from "@/contexts/editor";
import "@/modules/backend/client";
import { theme } from "@/modules/mui-config";
import { createEmotionCache } from "@/modules/utils";
import globalStyles from "@/styles/globals";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { SnackbarProvider } from "material-ui-snackbar-provider";
import ModalProvider from "mui-modal-provider";
import Head from "next/head";

import type { RouteProps } from "@/types";
import type { AppProps } from "next/app";

const clientEmotionCache = createEmotionCache();

export interface DisrobeAppProps extends AppProps {
  emotionCache?: EmotionCache;
  pageProps: RouteProps;
}

export default function App(props: DisrobeAppProps) {
  const { Component, emotionCache = clientEmotionCache, pageProps } = props;

  return (
    <>
      <GlobalStyles styles={globalStyles} />

      <Head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Stories on art, people and the world."
        />
        {/* <link rel="apple-touch-icon" href="/logo192.png" /> */}
      </Head>

      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <EditorProvider>
              <ModalProvider>
                <SnackbarProvider
                  SnackbarComponent={(props) => <AppSnackbar {...props} />}
                >
                  <Component {...pageProps} />
                </SnackbarProvider>
              </ModalProvider>
            </EditorProvider>
          </AuthProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
