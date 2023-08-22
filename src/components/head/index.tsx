import Head from "next/head";
import { useEffect, useState } from "react";

export default function DefaultHeadContent() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    setOrigin(location.origin);
  }, []);

  return (
    <Head>
      <title>Disrobe</title>
      <meta name="title" content="Disrobe" />
      <meta
        name="description"
        content="Stories on art, people and the world."
      />

      <meta property="og:title" content="Disrobe" />
      <meta property="og:type" content="website" />
      <meta
        property="og:description"
        content="Stories on art, people and the world."
      />

      <meta
        key="og:image"
        property="og:image"
        content={`${origin}/images/splash.jpg`}
      />
      <meta key="og:img:w" property="og:image:width" content="1200" />
      <meta key="og:img:h" property="og:image:height" content="630" />
    </Head>
  );
}
