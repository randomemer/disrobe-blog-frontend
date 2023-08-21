import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function DefaultHeadContent() {
  const [origin, setOrigin] = useState("");

  useEffect(() => {
    if (typeof window) {
      setOrigin(location.origin);
    }
  }, []);

  return (
    <>
      <title>Disrobe</title>
      <meta name="title" content="Disrobe" />
      <meta
        name="description"
        content="Stories on art, people and the world."
      />

      <meta property="og:title" content="Disrobe" />
      <meta property="og:type" content="article" />
      <meta
        property="og:description"
        content="Stories on art, people and the world."
      />

      <meta property="og:image" content={`${origin}/images/splash.jpg`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
    </>
  );
}
