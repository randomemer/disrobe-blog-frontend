import BlogLayout from "@/components/layout/home";
import { extractParagraphs } from "@/modules/utils";
import {
  AboutBackground,
  AboutContent,
  Paragraph,
} from "@/styles/about.styles";
import Head from "next/head";

export default function AboutRoute() {
  const paragraphs = extractParagraphs(content);

  return (
    <BlogLayout>
      <Head>
        <title>About</title>
      </Head>

      <AboutBackground />

      <AboutContent>
        {paragraphs.map((para, i) => (
          <Paragraph key={i}>{para}</Paragraph>
        ))}
      </AboutContent>
    </BlogLayout>
  );
}

const content = `
Welcome to Disrobe: Exploring the Threads of Art, Science, and Philosophy!

At Disrobe, we believe that true understanding and profound insights can be found at the intersection of art, science, and philosophy. We embark on a journey of exploration, where we delve into the intricate tapestry that connects these disciplines, unraveling the threads that bind them together.

Our blog is dedicated to providing a unique and thought-provoking perspective on the world we inhabit. By examining the interplay between art, science, and philosophy, we aim to foster a deeper understanding of the human experience and our place within the cosmos.

Through our carefully crafted articles, we invite you to join us on a voyage of intellectual curiosity and contemplation. Each piece we publish is meticulously curated to offer profound insights and provoke meaningful discourse. We strive to create a space where diverse ideas can coexist and flourish, encouraging readers to challenge their own beliefs and expand their horizons.

The world of art, with its captivating expressions, allows us to explore the depths of human emotions and the complexities of our existence. Through the lens of science, we unravel the mysteries of the universe, uncovering the laws that govern our physical reality. Philosophy, the great pursuit of wisdom, provides us with the tools to question and reflect upon the nature of truth, morality, and the human condition.

Our goal at Disrobe is to bridge the gaps between these disciplines, recognizing the inherent interconnectedness they share. By doing so, we seek to illuminate the profound insights that arise when we approach the world from a holistic and philosophical standpoint.

We aspire to create a vibrant community of curious minds, fostering dialogue and encouraging the exchange of ideas. Through our articles, we hope to inspire readers to embark on their own intellectual journeys, challenging conventions, embracing curiosity, and engaging with the wonders of art, science, and philosophy.

Join us as we unravel the mysteries of the universe, explore the nuances of human expression, and embark on a quest for wisdom. Let us embark on this remarkable journey together, shedding our preconceived notions, and embracing the exhilarating adventure that awaits us at Disrobe.
`;
