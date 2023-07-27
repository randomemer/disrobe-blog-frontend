import { Box, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { inputBaseClasses } from "@mui/material/InputBase";

export const ContentRoot = styled(Box)`
  flex: 1;
  overflow: auto;
`;

export const ContentWrapper = styled("div")`
  max-width: 108rem;
  margin: 0 auto;
  padding: 4.8rem 6.4rem;
  font-size: 1.8rem;
  line-height: normal;

  .article-editor {
    display: flex;
    flex-direction: column;
    gap: 4.8rem;
  }

  .editor-block {
    padding: 0.8rem 1.6rem;
    border-left: solid 3px #aaa;

    /* when the cursor is in that block */
    &:focus,
    &--selected {
      border-color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

export const StoryTitle = styled(TextField)`
  padding: 0rem 1.6rem;
  border-left: solid 3px #aaa;
  margin-bottom: 2.4rem;

  .${inputBaseClasses.root} {
    font-weight: 700;
    font-size: 4.8rem;
  }
`;
