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
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";

import type { RouteProps } from "@/types";
import type { AppProps } from "next/app";
import StorySettingsProvider from "@/contexts/story-settings";

const clientEmotionCache = createEmotionCache();
const globalStylesEl = <GlobalStyles styles={globalStyles} />;

export interface DisrobeAppProps extends AppProps {
  emotionCache?: EmotionCache;
  pageProps: RouteProps;
}

export default function App(props: DisrobeAppProps) {
  const { Component, emotionCache = clientEmotionCache, pageProps } = props;

  return (
    <>
      {globalStylesEl}

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
          <CssBaseline enableColorScheme />
          <AuthProvider>
            <EditorProvider>
              <StorySettingsProvider>
                <ModalProvider>
                  <SnackbarProvider
                    SnackbarComponent={(props) => <AppSnackbar {...props} />}
                  >
                    <NextNProgress
                      color={theme.palette.primary.main}
                      height={1.5}
                      options={{ showSpinner: false }}
                    />
                    <Component {...pageProps} />
                  </SnackbarProvider>
                </ModalProvider>
              </StorySettingsProvider>
            </EditorProvider>

            {/* <NProgre */}
          </AuthProvider>
        </ThemeProvider>
      </CacheProvider>
    </>
  );
}
