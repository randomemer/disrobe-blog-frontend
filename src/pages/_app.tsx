import AuthProvider from "@/contexts/auth";
import "@/modules/backend/client";
import { theme } from "@/modules/mui-config";
import "@/styles/globals.scss";
import { ThemeProvider } from "@mui/material/styles";
import { DM_Sans } from "next/font/google";
import Head from "next/head";
import { EditorProvider } from "@/contexts/editor";
import ModalProvider from "mui-modal-provider";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { createEmotionCache } from "@/modules/utils";
import { SnackbarProvider } from "material-ui-snackbar-provider";

import { RouteProps } from "@/types";
import type { AppProps } from "next/app";
import AppSnackbar from "@/components/snackbar";
import AuthTestProvider from "@/contexts/auth-test";

const clientEmotionCache = createEmotionCache();
const DMSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

export interface DisrobeAppProps extends AppProps {
  emotionCache?: EmotionCache;
  pageProps: RouteProps;
}

export default function App(props: DisrobeAppProps) {
  const { Component, emotionCache = clientEmotionCache, pageProps } = props;

  return (
    <>
      <style jsx global>{`
        body {
          font-family: ${DMSans.style.fontFamily}, sans-serif;
        }
      `}</style>

      <Head>
        <meta charSet="utf-8" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta
          name="description"
          content="Stories on art, people and the world."
        />
        {/* <link rel="apple-touch-icon" href="/logo192.png" /> */}
      </Head>

      <CacheProvider value={emotionCache}>
        <AuthTestProvider>
          <AuthProvider author={pageProps.author}>
            <ThemeProvider theme={theme}>
              <EditorProvider>
                <ModalProvider>
                  <SnackbarProvider
                    SnackbarComponent={(props) => <AppSnackbar {...props} />}
                  >
                    <Component {...pageProps} />
                  </SnackbarProvider>
                </ModalProvider>
              </EditorProvider>
            </ThemeProvider>
          </AuthProvider>
        </AuthTestProvider>
      </CacheProvider>
    </>
  );
}
