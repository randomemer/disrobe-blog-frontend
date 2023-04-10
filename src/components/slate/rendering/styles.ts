import { Link } from "@mui/material";
import { styled } from "@mui/material/styles";

// const EditorBlock = styled

export const EParagraph = styled("p")`
  /* font-size: ; */
`;

export const EBlockQuote = styled("blockquote")`
  background-color: rgba(128, 128, 128, 0.15);
  font-style: italic;
`;

const listStyles = () => `
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

export const EOrderedList = styled("ol")`
  ${listStyles()}
`;

export const EUnorderedList = styled("ul")`
  list-style: disc;

  ${listStyles()}
`;

export const ELink = styled(Link)``;

export const EListItem = styled("li")`
  list-style-position: inside;
`;
