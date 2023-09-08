import ImageWithFallback from "@/components/image";
import { PlainLink } from "@/styles/shared";
import { Box, Card } from "@mui/material";
import { styled } from "@mui/material/styles";

export const StoryCardItem = styled(Card)`
  display: flex;
  flex-direction: column;

  height: 27rem;
  padding: 1.8rem 3rem;

  &:not(:last-child) {
    margin-bottom: 4.8rem;
  }

  .story-author {
    margin-bottom: 1.8rem;
  }

  ${({ theme }) => theme.breakpoints.down("lg")} {
    height: 24rem;
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    padding: 1.8rem 2.4rem;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    height: auto;

    &:not(:last-child) {
      margin-bottom: 2.4rem;
    }
  }
`;

export const StoryCardContent = styled("div")`
  display: flex;
  gap: 3.6rem;
  flex: 1;
  overflow: hidden;

  ${({ theme }) => theme.breakpoints.down("md")} {
    gap: 2.4rem;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex: unset;
    flex-direction: column-reverse;
    gap: 1.8rem;
  }
`;

export const StoryThumbnailLink = styled(PlainLink)`
  flex: 1;
  display: block;
  height: 100%;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex: unset;
  }
`;

export const StoryThumbnail = styled(ImageWithFallback)`
  height: 100%;
  width: 100%;

  &.broken {
    background-color: unset;
  }

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const StoryCardRight = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

export const StoryCardTitle = styled("h3")`
  font-size: 3rem;
  font-weight: 600;

  ${({ theme: { breakpoints } }) => breakpoints.down("lg")} {
    font-size: 2.4rem;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 2rem;
  }
`;

export const Gist = styled("p")`
  font-size: 1.7rem;
  font-weight: 400;
  line-height: 1.4;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.75);

  ${({ theme: { breakpoints } }) => breakpoints.down("lg")} {
    font-size: 1.5rem;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    display: none !important;
  }
`;

export const StoryLink = styled(PlainLink)`
  display: contents;
`;
