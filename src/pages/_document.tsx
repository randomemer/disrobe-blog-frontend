import Document, { Html, Head, Main, NextScript } from "next/document";
import { getInitColorSchemeScript } from "@mui/material/styles";
import { createEmotionCache } from "@/modules/utils";
import createEmotionServer from "@emotion/server/create-instance";

import type { AppType } from "next/app";
import type { DocumentProps, DocumentContext } from "next/document";
import type { DisrobeAppProps } from "./_app";

export interface DisrobeDocumentProps extends DocumentProps {
  emotionStyleTags: JSX.Element[];
}

export default function DisrobeDocument(props: DisrobeDocumentProps) {
  return (
    <Html lang="en">
      <Head>{props.emotionStyleTags}</Head>

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
