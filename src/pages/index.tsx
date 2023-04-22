import StoryAuthor from "@/components/author";
import BlogLayout from "@/components/layout/home";
import {
  EmailTextField,
  SectionHeading,
  Sidebar,
  SplashContainer,
  SplashContent,
  SplashSection,
  StoriesSection,
  StoryCardContent,
  StoryCardDiv,
  StoryCardRight,
  StoryThumbnail,
  ThumbnailWrapper,
  StyledLink,
} from "@/styles/home.styles";
import { getStoryGist, getStoryThumb } from "@/modules/utils";
import { MailRounded } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { Element } from "slate";
import { StoryModel } from "@/modules/backend";
import { ModelObject } from "objection";

export const getServerSideProps = async () => {
  try {
    console.time("home_feed");

    const results = await StoryModel.query()
      .withGraphJoined({ author: true, draft: true })
      .limit(25);

    console.timeEnd("home_feed");

    const serialized = results.map((r) => r.toJSON());

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
        <div className="ads"></div>

        <div className="middle-col">
          <SectionHeading>Recently Published</SectionHeading>
          <div className="stories-list">
            {stories.map((story) => (
              <StoryCard key={story.id} story={story} />
            ))}
          </div>
        </div>

        <Sidebar>
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
        </Sidebar>
      </StoriesSection>
    </BlogLayout>
  );
}

export interface StoryCardProps {
  story: ModelObject<StoryModel>;
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
        {Element.isElement(thumb) && thumb.type === "image" && thumb.url && (
          <ThumbnailWrapper>
            <StyledLink href={path} underline="none">
              <StoryThumbnail fill src={thumb.url} alt="Story Thumbnail" />
            </StyledLink>
          </ThumbnailWrapper>
        )}
        <StoryCardRight>
          <h3 className="title">
            <StyledLink href={path} underline="none">
              {title}
            </StyledLink>
          </h3>
          <p className="gist">
            <StyledLink href={path} underline="none">
              {getStoryGist(content)}
            </StyledLink>
          </p>
        </StoryCardRight>
      </StoryCardContent>
    </StoryCardDiv>
  );
}
