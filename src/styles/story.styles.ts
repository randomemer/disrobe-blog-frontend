import { Box, Typography } from "@mui/material";
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

export const StoryHeading = styled(Typography)`
  margin-bottom: 1.6rem;
  line-height: 1.25;
`;

export const StoryByLine = styled("div")`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2.4rem;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    flex-direction: column;
    gap: 1.8rem;
  }
`;

export const StoryContent = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 4.8rem;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    gap: 3.6rem;
  }
`;

export const BaseText = styled(Typography)`
  font-size: 2rem;

  ${({ theme }) => theme.breakpoints.down("lg")} {
    font-size: 1.9rem;
  }
`;

export const Paragraph = styled(BaseText)`
  white-space: pre-line;
  line-height: 1.6;
` as typeof Typography;

export const Code = styled(BaseText)`
  /* all code elements */
  font-size: inherit;
  font-family: "SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace;

  /* Code in text */
  background: #333;
  word-wrap: break-word;
  box-decoration-break: clone;
  padding: 0.1rem 0.3rem 0.2rem;
  border-radius: 0.2rem;
` as typeof Typography;

export const Figure = styled("figure")`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  img {
    max-width: 100%;
  }

  figcaption {
    font-size: 1.6rem;
    color: rgb(255, 255, 255, 0.75);
  }
`;

export const BlockQuote = styled(BaseText)`
  padding: 1.8rem;
  line-height: 1.4;
  background-color: #333;
  font-style: italic;
`;

export const ListItem = styled(BaseText)`
  ul > & {
    list-style-type: disc;
  }
` as typeof Typography;

export const List = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;

  margin-left: 0;
  padding-left: 3.6rem;
`;
