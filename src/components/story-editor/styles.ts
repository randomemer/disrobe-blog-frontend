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

  .editor-block {
    padding: 0.8rem 1.6rem;
    border-left: solid 3px #aaa;
    margin-bottom: 4.8rem;

    /* when the cursor is in that block */
    &:focus,
    &--selected {
      border-color: general.$primary-color;
    }
  }
`;

export const StoryTitle = styled(TextField)`
  margin-bottom: 2.4rem;

  .${inputBaseClasses.root} {
    font-weight: 700;
    font-size: 4.8rem;
  }
`;
