import StoryAuthor from "@/components/author";
import BlogLayout from "@/components/layout/home";
import { serializeToHTML } from "@/modules/slate/serialize";
import {
  Article,
  ArticleGrid,
  StoryByLine,
  StoryContent,
  StoryHeading,
  StoryHeadingBox,
} from "@/styles/story.styles";
import Head from "next/head";
import { StoryModel } from "@/modules/backend";
import { StoryJoinedJSON } from "@/types/backend";
import { jsonify } from "@/modules/utils";
import StorySocials from "@/components/socials";
import SuggestedArticles from "@/components/suggested-articles";

import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<StoryRouteProps> = async (
  context
) => {
  const id = context?.params?.id as string;

  const story = await StoryModel.query()
    .withGraphJoined({ author: true, draft: true, settings: true })
    .findById(id);

  if (!story) throw new Error("Story Not Found");

  const suggestedStories = await StoryModel.query()
    .withGraphJoined({
      author: true,
      draft: true,
      settings: true,
    })
    .where(`${StoryModel.tableName}.id`, "!=", id)
    .orderBy("created_at", "DESC")
    .limit(5);

  context.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      story: jsonify(story),
      suggested: jsonify(suggestedStories),
    },
  };
};

export interface StoryRouteProps {
  story: StoryJoinedJSON;
  suggested: StoryJoinedJSON[];
}

export default function StoryRoute(props: StoryRouteProps) {
  const story = props.story;
  const { title, content } = story.draft;
  const { settings } = story;

  return (
    <BlogLayout>
      <Head>
        {/* Basic Config */}
        <title>{settings.meta_title}</title>
        <meta name="title" content={settings.meta_title ?? undefined} />
        <meta name="description" content={settings.meta_desc ?? undefined} />

        {/* Open Graph - Main */}
        <meta property="og:title" content={settings.meta_title ?? "Disrobe"} />
        <meta property="og:type" content="article" />
        <meta
          property="og:description"
          content={settings.meta_desc ?? undefined}
        />
        <meta property="og:image" content={settings.meta_img ?? undefined} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        {/* Open Graph - Article */}
        <meta name="article:author" content={story.author.name} />
        <meta name="article:modified_time" content={story.live?.timestamp} />
      </Head>

      <ArticleGrid>
        <Article>
          <StoryHeadingBox>
            <StoryHeading variant="h1">{title}</StoryHeading>
            <StoryByLine>
              <StoryAuthor story={story} />
              <StorySocials />
            </StoryByLine>
          </StoryHeadingBox>

          <StoryContent>{serializeToHTML(content)}</StoryContent>
        </Article>

        <SuggestedArticles stories={props.suggested} />
      </ArticleGrid>
    </BlogLayout>
  );
}
