import ImageWithFallback from "@/components/image";
import { Box, Card, TextField } from "@mui/material";
import { inputClasses } from "@mui/material/Input";
import { styled } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { PlainLink } from "./shared";

export const SplashSection = styled("section")`
  height: 100vh;
  margin: 0 auto;
  padding-top: 12.8rem;

  transform: translateY(calc(var(--app-header-height) * -1));

  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url("/images/splash.jpg");
  background-size: cover;
  background-position: center;
`;

export const SplashContainer = styled("div")`
  width: 100%;
  max-width: 130rem;
  margin: 0 auto;
  padding: 0 5.6rem;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 0 3.6rem;
  }
`;

export const SplashContent = styled("div")`
  max-width: 60rem;

  ${({ theme }) => theme.breakpoints.down("md")} {
    max-width: 48rem;
  }
`;

export const SplashTitle = styled("h1")`
  font-size: 5.6rem;
  line-height: 1.1;

  span.highlight {
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.palette.primary.main};
  }

  ${({ theme }) => theme.breakpoints.down("lg")} {
    font-size: 4.8rem;
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: 4.2rem;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 3.6rem;
  }
`;

export const StoriesSection = styled("section")`
  max-width: 84rem;
  justify-content: center;
  margin: 4.8rem auto 12.8rem;

  /* display: grid;
  grid-template-columns: 84rem; */

  ${({ theme: { breakpoints } }) => breakpoints.down("lg")} {
    padding: 0 4.8rem;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 0 3rem;
  }
`;

export const SectionHeading = styled("h2")`
  font-size: 3.6rem;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: 6.4rem;

  ${({ theme }) => theme.breakpoints.down("md")} {
    font-size: 3rem;
    margin-bottom: 4.8rem;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    /* font-size: 2.4rem; */
    margin-bottom: 3.6rem;
  }
`;

export const Sidebar = styled("div")`
  .tagline {
    font-size: 2.4rem;
    margin-bottom: 1.8rem;
  }
`;

export const EmailTextField = styled(TextField)`
  .${inputClasses.root} {
    font-size: 1.6rem;
  }

  .Mui-focused {
    .${svgIconClasses.root} {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
  .${svgIconClasses.root} {
    font-size: 2rem;
  }
`;
