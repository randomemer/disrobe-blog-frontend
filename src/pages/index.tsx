import StoryAuthor from "@/components/author";
import BlogLayout from "@/components/layout/home";
import $clamp from "clamp-js";
import { StoryModel } from "@/modules/backend";
import { getContentString, getStoryThumb, jsonify } from "@/modules/utils";
import {
  Gist,
  SectionHeading,
  SplashContainer,
  SplashContent,
  SplashSection,
  SplashTitle,
  StoriesSection,
  StoryCardContent,
  StoryCardItem,
  StoryCardRight,
  StoryCardTitle,
  StoryThumbnail,
  StoryThumbnailLink,
} from "@/styles/home.styles";
import { StoryJoinedJSON } from "@/types/backend";
import { GetServerSidePropsContext } from "next";
import { useEffect, useRef, useState } from "react";
import { PlainLink } from "@/styles/shared";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    ctx.res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    );

    console.time("home_feed");

    const results = await StoryModel.query()
      .withGraphJoined({ author: true, draft: true })
      .limit(25);

    console.timeEnd("home_feed");

    const serialized = results.map((r) => jsonify(r.toJSON()));

    return { props: { stories: serialized } };
  } catch (error) {
    console.error("Error occured while fetching feed", error);
    return { props: { stories: [] } };
  }
};

export interface HomeRouteProps {
  stories: any[];
}

export default function Home(props: HomeRouteProps) {
  const { stories } = props;

  return (
    <BlogLayout>
      <SplashSection>
        <SplashContainer>
          <SplashContent>
            <SplashTitle>
              Stories on <span className="highlight">art</span>,{" "}
              <span className="highlight">people</span> and the{" "}
              <span className="highlight">world</span>.
            </SplashTitle>
          </SplashContent>
        </SplashContainer>
      </SplashSection>

      <StoriesSection>
        {/* TODO : Add ads to the site */}
        {/* <div className="ads"></div> */}

        <div>
          <SectionHeading>Recently Published</SectionHeading>
          <div>
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>

        {/* TODO : Add a mail subscription */}
        {/* <Sidebar>
          <div className="cta-element">
            <p className="tagline">Don&apos;t miss anything from us</p>

            <EmailTextField
              fullWidth
              hiddenLabel
              variant="standard"
              placeholder="Your Email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailRounded className="mail-icon" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </Sidebar> */}
      </StoriesSection>
    </BlogLayout>
  );
}

export interface StoryCardProps {
  story: StoryJoinedJSON;
}

export function StoryCard(props: StoryCardProps) {
  const { story } = props;
  const gistRef = useRef<HTMLDivElement>(null);

  // TODO : change to live in production
  const { title, content } = story.draft;
  const thumb = getStoryThumb(content);

  const path = `/story/${story.id}`;

  const listener = () => {
    if (gistRef.current) {
      $clamp(gistRef.current, { clamp: "auto" });
    }
  };

  useEffect(() => {
    listener();
    visualViewport?.addEventListener("resize", listener);

    return () => visualViewport?.removeEventListener("resize", listener);
  }, []);

  return (
    <StoryCardItem>
      <StoryAuthor story={story} />
      <StoryCardContent>
        <StoryThumbnailLink href={path}>
          <StoryThumbnail ImageProps={{ src: thumb?.url, alt: thumb?.alt }} />
        </StoryThumbnailLink>
        <PlainLink href={path} sx={{ display: "flex", flex: 2 }}>
          <StoryCardRight>
            <StoryCardTitle>{title}</StoryCardTitle>
            <Gist ref={gistRef}>{getContentString(content)}</Gist>
          </StoryCardRight>
        </PlainLink>
      </StoryCardContent>
    </StoryCardItem>
  );
}
