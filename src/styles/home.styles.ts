import ImageWithFallback from "@/components/image";
import { Box, Card, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

export const SplashSection = styled("section")`
  height: 100vh;
  margin: 0 auto;

  display: flex;
  align-items: center;

  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/images/splash.jpg");
  background-size: cover;
  transform: translateY(calc(var(--app-header-height) * -1));
`;

export const SplashContainer = styled("div")`
  max-width: 120rem;
  margin: 0 auto;
`;

export const SplashContent = styled("div")`
  width: 50%;
`;

export const SplashTitle = styled("h1")`
  font-size: 5.6rem;
  line-height: 1.1;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    font-size: 4.8rem;
  }

  span.highlight {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const StoriesSection = styled("section")`
  max-width: 84rem;
  justify-content: center;

  /* display: grid;
  grid-template-columns: 84rem; */

  margin: 4.8rem auto 12.8rem;

  ${({ theme: { breakpoints } }) => breakpoints.down("lg")} {
    padding: 0 4.8rem;
  }
`;

export const SectionHeading = styled("h2")`
  font-size: 3.6rem;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 6.4rem;
`;

export const StoryCardDiv = styled(Card)`
  display: flex;
  flex-direction: column;

  height: 30rem;
  padding: 1.8rem 3rem;
  margin-bottom: 4.8rem;

  .story-author {
    margin-bottom: 1.8rem;
  }

  ${({ theme: { breakpoints } }) => breakpoints.down("lg")} {
    height: 27rem;
  }

  ${({ theme: { breakpoints } }) => breakpoints.down("md")} {
    height: 24rem;
  }
`;

export const StoryCardContent = styled("div")`
  display: flex;
  gap: 3.6rem;
  flex: 1;
  overflow: hidden;
`;

export const StoryThumbnailLink = styled(Link)`
  flex: 1;
  display: block;
  height: 100%;
`;

export const StoryThumbnail = styled(ImageWithFallback)`
  height: 100%;
  width: 100%;
  background: yellow;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const StoryCardRight = styled(Box)`
  flex: 2;
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

  ${({ theme: { breakpoints } }) => breakpoints.down("md")} {
    margin-bottom: 1.4rem;
  }
`;

export const Gist = styled("p")`
  display: block;
  flex: 1;

  font-size: 1.7rem;
  font-weight: 400;
  line-height: 1.4;

  ${({ theme: { breakpoints } }) => breakpoints.down("lg")} {
    font-size: 1.5rem;
  }
`;

export const Sidebar = styled("div")`
  .tagline {
    font-size: 2.4rem;
    margin-bottom: 1.8rem;
  }
`;

export const EmailTextField = styled(TextField)`
  .MuiInput-root {
    font-size: 1.6rem;
  }

  .Mui-focused {
    .MuiSvgIcon-root {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
  .MuiSvgIcon-root {
    font-size: 2rem;
  }
`;
