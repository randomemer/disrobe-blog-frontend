import StoryAuthor from "@/components/author";
import BlogLayout from "@/components/layout/home";
import { StoryModel } from "@/modules/backend";
import { getStoryGist, getStoryThumb, jsonify } from "@/modules/utils";
import {
  Gist,
  SectionHeading,
  SplashContainer,
  SplashContent,
  SplashSection,
  StoriesSection,
  StoryCardContent,
  StoryCardDiv,
  StoryCardRight,
  StoryCardTitle,
  StoryThumbnail,
} from "@/styles/home.styles";
import { PlainLink } from "@/styles/shared";
import { StoryJoinedJSON } from "@/types/backend";

export const getServerSideProps = async () => {
  try {
    console.time("home_feed");

    const results = await StoryModel.query()
      .withGraphJoined({ author: true, draft: true })
      .limit(25);

    console.timeEnd("home_feed");

    const serialized = results.map((r) => jsonify(r.toJSON()));

    return { props: { stories: serialized } };
  } catch (error) {
    console.error("Error occured while fetching feed\n", error);
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
            <h1>
              Stories on <span className="highlight">art</span>,{" "}
              <span className="highlight">people</span> and the{" "}
              <span className="highlight">world</span>.
            </h1>
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

function StoryCard(props: StoryCardProps) {
  const { story } = props;

  // TODO : change to live in production
  const { title, content } = story.draft;
  const thumb = getStoryThumb(content);

  const path = `/story/${story.id}`;

  return (
    <StoryCardDiv>
      <StoryAuthor story={story} />
      <StoryCardContent>
        <PlainLink href={path}>
          <StoryThumbnail ImageProps={{ src: thumb?.url, alt: thumb?.alt }} />
        </PlainLink>
        <StoryCardRight>
          <PlainLink href={path}>
            <StoryCardTitle>{title}</StoryCardTitle>
          </PlainLink>
          <PlainLink href={path}>
            <Gist>{getStoryGist(content)}</Gist>
          </PlainLink>
        </StoryCardRight>
      </StoryCardContent>
    </StoryCardDiv>
  );
}
