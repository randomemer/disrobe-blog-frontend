import Document, { Html, Head, Main, NextScript } from "next/document";
import { getInitColorSchemeScript } from "@mui/material/styles";
import { createEmotionCache } from "@/modules/utils";
import createEmotionServer from "@emotion/server/create-instance";

import type { AppType } from "next/app";
import type { DocumentProps, DocumentContext } from "next/document";
import type { DisrobeAppProps } from "./_app";
import { theme } from "@/modules/mui-config";

export interface DisrobeDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function DisrobeDocument(props: DisrobeDocumentProps) {
  return (
    <Html lang="en">
      <Head>
        {props.emotionStyleTags}
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow, max-image-preview:large" />

        {/* Icons */}
        <link rel="icon" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" sizes="32x32" href="/favicon-32x32.png" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link rel="icon" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" sizes="512x512" href="/android-chrome-512x512.png" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />

        <meta property="og:site_name" content="Disrobe" />
        <meta name="twitter:card" content="summary_large_image" />

        <meta name="theme-color" content={theme.palette.primary.main} />
        <meta
          name="msapplication-TileColor"
          content={theme.palette.primary.main}
        />
      </Head>

      <body>
        {getInitColorSchemeScript()}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

DisrobeDocument.getInitialProps = async (context: DocumentContext) => {
  const originalRenderPage = context.renderPage;

  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  context.renderPage = () =>
    originalRenderPage({
      enhanceApp: (
        App: React.ComponentType<
          React.ComponentProps<AppType> & DisrobeAppProps
        >
      ) =>
        function EnhanceApp(props) {
          return <App emotionCache={cache} {...props} />;
        },
    });

  const initialProps = await Document.getInitialProps(context);

  const emotionStyles = extractCriticalToChunks(initialProps.html);

  const emotionStyleTags = emotionStyles.styles.map((style) => (
    <style
      key={style.key}
      data-emotion={`${style.key} ${style.ids.join(" ")}`}
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: style.css }}
    />
  ));

  return {
    ...initialProps,
    emotionStyleTags,
  };
};
