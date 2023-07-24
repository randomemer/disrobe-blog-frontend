import { styled } from "@mui/material/styles";

export const ArticleGrid = styled("div")`
  display: grid;
  margin: 4.8rem auto 12.8rem;
  max-width: 130rem;
  padding: 0 6.4rem;

  grid-template-columns: 1fr 27rem;
  gap: 6.4rem;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    grid-template-columns: 1fr 24rem;
    gap: 5.6rem;
  }

  ${({ theme }) => theme.breakpoints.down("md")} {
    grid-template-columns: 1fr;
    padding: 0 4.8rem;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 0 3.6rem;
  }
`;

export const Article = styled("article")``;

export const StoryHeadingBox = styled("div")`
  margin-bottom: 5.6rem;
`;

export const StoryHeading = styled("h1")`
  font-size: 4.2rem;
  margin-bottom: 1.4rem;
  line-height: 1.25;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    font-size: 3.6rem;
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 3rem;
  }
`;

export const StoryByLine = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.4rem;
`;

export const StoryContent = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 4.8rem;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    gap: 3.6rem;
  }

  > * {
    font-size: 2rem;

    ${({ theme }) => theme.breakpoints.down("lg")} {
      font-size: 1.8rem;
    }

    ${({ theme }) => theme.breakpoints.down("sm")} {
      font-size: 1.6rem;
    }
  }

  /* in-line elements */

  /* all code elements */
  code {
    font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;
    font-size: inherit;
  }

  /* Code in text */
  p > code,
  li > code {
    background: #333;
    word-wrap: break-word;
    box-decoration-break: clone;
    padding: 0.1rem 0.3rem 0.2rem;
    border-radius: 0.2rem;
  }

  a {
    &:link,
    &:visited {
      color: ${({ theme }) => theme.palette.primary.main};
    }

    &:active,
    &:hover {
      text-decoration: underline;
    }
  }

  /* block elements */

  h2 {
    /* font-size: 3.9rem; */
    font-weight: 700;
  }

  h3 {
    /* font-size: 3rem; */
    font-weight: 600;
  }

  p {
    white-space: pre-line;
    line-height: 1.6;
  }

  figure {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    img {
      max-width: 100%;
    }

    figcaption {
      align-self: center;
      font-size: 1.6rem;
      color: rgb(255, 255, 255, 0.75);
    }
  }

  blockquote {
    padding: 1.8rem;
    line-height: 1.4;
    background-color: #333;
    font-style: italic;
  }

  ul,
  ol {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;

    margin-left: 0;
    padding-left: 3.6rem;
  }

  ul {
    > li {
      list-style-type: disc;
    }
  }
`;
