import StoryAuthor from "@/components/author";
import BlogLayout from "@/components/layout/home";
import StoryModel from "@/modules/backend/client/models/story";
import AdminStoryRepo from "@/modules/backend/admin/repos/story";
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
} from "@/styles/home.styles";
import { getStoryThumb } from "@/utils";
import { MailRounded } from "@mui/icons-material";
import { InputAdornment } from "@mui/material";
import { Element, Node } from "slate";
import { StoryJSON } from "@/types/backend";
import { useMemo } from "react";

export const getServerSideProps = async () => {
  try {
    const stories = await new AdminStoryRepo().fetchFeed();
    return { props: { stories: stories.map((story) => story.toJSON()) } };
  } catch (error) {
    console.error("Error occured while fetching feed\n", error);
    return { props: { stories: [] } };
  }
};

export interface HomeRouteProps {
  stories: StoryJSON[];
}

export default function Home(props: HomeRouteProps) {
  const stories = useMemo(() => {
    return props.stories.map((json) => new StoryModel(json));
  }, [props.stories]);

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
  story: StoryModel;
}

function StoryCard(props: StoryCardProps) {
  const { story } = props;

  // TODO : change to live in production
  const { title, content } = story.draft;
  const paragraph = content.find(
    (node) => Element.isElement(node) && node.type === "paragraph"
  );
  const thumb = getStoryThumb(content);

  return (
    <StoryCardDiv>
      <StoryAuthor story={story} />
      <StoryCardContent>
        <ThumbnailWrapper>
          <StoryThumbnail
            fill
            src={
              (Element.isElement(thumb) &&
                thumb.type === "image" &&
                thumb?.url) ||
              ""
            }
            alt="Story Thumbnail"
          />
        </ThumbnailWrapper>
        <StoryCardRight>
          <h3 className="title">{title}</h3>
          <p className="gist">{paragraph ? Node.string(paragraph) : null}</p>
        </StoryCardRight>
      </StoryCardContent>
    </StoryCardDiv>
  );
}
