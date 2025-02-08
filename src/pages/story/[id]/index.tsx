import StoryAuthor from "@/components/author";
import BlogLayout from "@/components/layout/home";
import StorySocials from "@/components/socials";
import SuggestedArticles from "@/components/suggested-articles";
import { serializeToHTML } from "@/modules/slate/serialize";
import { api, combineURLQuery } from "@/modules/utils";
import {
  Article,
  ArticleGrid,
  StoryByLine,
  StoryContent,
  StoryHeading,
  StoryHeadingBox,
} from "@/styles/story.styles";
import { StoryJoinedJSON } from "@/types/backend";
import Head from "next/head";

import type { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps<StoryRouteProps> = async (
  ctx
) => {
  const id = ctx?.params?.id as string;

  const storyResp = await api.get<StoryJoinedJSON>(`/v1/story/${id}`);
  const story = storyResp.data;

  if (!story) throw new Error("Story Not Found");

  if (["HEAD", "OPTIONS"].includes(ctx.req.method ?? "")) {
    return {
      props: {} as StoryRouteProps,
    };
  }

  const filter = {
    where: {
      id: { neq: id },
      ...(process.env.NODE_ENV === "production" && {
        is_published: { eq: true },
      }),
    },
    relations: { author: {}, draft: {}, live: {}, settings: {} },
    limit: 5,
    sort: { created_at: "desc" },
  };
  const url = combineURLQuery("/v1/story/", { filter: JSON.stringify(filter) });
  const otherResp = await api.get<StoryJoinedJSON[]>(url);

  ctx.res.setHeader(
    "Cache-Control",
    "public, s-maxage=10, stale-while-revalidate=59"
  );

  return {
    props: {
      story,
      suggested: otherResp.data,
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
        <meta name="article:published_time" content={story.live?.created_at} />
        <meta name="article:modified_time" content={story.live?.updated_at} />
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
