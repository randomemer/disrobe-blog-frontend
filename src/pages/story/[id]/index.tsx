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
    .withGraphJoined({ author: true, draft: true })
    .findById(id);

  if (!story) throw new Error("Story Not Found");

  const suggestedStories = await StoryModel.query()
    .withGraphJoined({
      author: true,
      draft: true,
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

  return (
    <BlogLayout>
      <Head>
        <title>{`${title} | Disrobe`}</title>
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
