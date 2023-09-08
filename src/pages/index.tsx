import DefaultHeadContent from "@/components/head";
import BlogLayout from "@/components/layout/home";
import StoryCard from "@/components/story-card";
import { api } from "@/modules/utils";
import {
  SectionHeading,
  SplashContainer,
  SplashContent,
  SplashSection,
  SplashTitle,
  StoriesSection,
} from "@/styles/home.styles";
import { StoryJoinedJSON } from "@/types/backend";
import { GetServerSidePropsContext } from "next";

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  try {
    if (["HEAD", "OPTIONS"].includes(ctx.req.method ?? "")) {
      return {
        props: {},
      };
    }

    ctx.res.setHeader(
      "Cache-Control",
      "public, s-maxage=10, stale-while-revalidate=59"
    );

    console.time("home_feed");

    const filter = {
      where: {
        ...(process.env.NODE_ENV === "production" && {
          is_published: { eq: true },
        }),
      },
      limit: 25,
      relations: ["author", "draft", "live", "settings"],
    };
    const query = new URLSearchParams({ filter: JSON.stringify(filter) });

    const resp = await api.get<StoryJoinedJSON[]>(
      `/v1/story/?${query.toString()}`
    );

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
