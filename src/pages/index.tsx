import StoryAuthor from "@/components/author";
import DefaultHeadContent from "@/components/head";
import BlogLayout from "@/components/layout/home";
import { api, getContentString } from "@/modules/utils";
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
import { PlainLink } from "@/styles/shared";
import { StoryJoinedJSON } from "@/types/backend";
import $clamp from "clamp-js";
import { GetServerSidePropsContext } from "next";
import { useEffect, useRef } from "react";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    ctx.res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    );

    console.time("home_feed");

    const filter = {
      limit: 25,
      relations: ["author", "draft", "live", "settings"],
    };
    const query = new URLSearchParams({ filter: JSON.stringify(filter) });

    const resp = await api.get<StoryJoinedJSON[]>(
      `/v1/story?${query.toString()}`
    );

    console.log(`/v1/story?${query.toString()}`);

    console.timeEnd("home_feed");
    return { props: { stories: resp.data } };
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
    <>
      <DefaultHeadContent />

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
    </>
  );
}

export interface StoryCardProps {
  story: StoryJoinedJSON;
}

export function StoryCard(props: StoryCardProps) {
  const { story } = props;
  const gistRef = useRef<HTMLDivElement>(null);

  const { title, content } =
    process.env.NODE_ENV === "production" ? story.live! : story.draft;
  // const thumb = getStoryThumb(content);

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
          <StoryThumbnail
            ImageProps={{
              src: story.settings.meta_img ?? undefined,
              alt: undefined,
            }}
          />
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
