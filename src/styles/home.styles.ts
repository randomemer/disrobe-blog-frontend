import ImageWithFallback from "@/components/image";
import { Link, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import { elevation } from "./shared";

export const SplashSection = styled("section")`
  height: 100vh;
  margin: 0 auto;
  padding-top: 25vh;

  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/images/splash.png");
  background-size: cover;
  transform: translateY(calc(var(--app-header-height) * -1));
`;

export const SplashContainer = styled("div")`
  max-width: 120rem;
  margin: 0 auto;
`;

export const SplashContent = styled("div")`
  width: 50%;

  h1 {
    font-size: 5.6rem;
    line-height: 1.1;

    span.highlight {
      text-decoration: underline;
      text-decoration-color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

export const StoriesSection = styled("section")`
  max-width: 128rem;
  display: grid;

  grid-template-columns: 1fr 72rem 1fr;
  column-gap: 8.4rem;

  margin: 4.8rem auto 6rem;
`;

export const SectionHeading = styled("h2")`
  font-size: 3.6rem;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 6.4rem;
  // text-transform: uppercase;
`;

export const StoryCardDiv = styled("div")`
  display: flex;
  flex-direction: column;

  position: relative;
  overflow: hidden;
  min-height: 30rem;
  padding: 1.8rem 3rem;
  margin-bottom: 4.8rem;
  ${elevation(0.1)}

  .story-author {
    margin-bottom: 1.8rem;
  }
`;

export const StoryCardContent = styled("div")`
  display: grid;
  grid-template-columns: 22rem auto;
  gap: 3.6rem;
  flex: 1;
`;

export const StoryThumbnail = styled(ImageWithFallback)`
  height: 100%;
  width: 100%;

  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export const StoryCardRight = styled("div")`
  .title {
    font-size: 3rem;
    margin-bottom: 1.8rem;
    font-weight: 600;
  }

  .gist {
    display: block;
    height: 100%;

    font-size: 1.7rem;
    font-weight: 400;
    line-height: 1.4;
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

export const StyledLink = styled(Link)`
  color: inherit;
`;
