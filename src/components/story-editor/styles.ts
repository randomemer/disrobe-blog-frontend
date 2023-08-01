import { Box, Fab, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Editable } from "slate-react";

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

    /* when the cursor is in that block */
    &:focus,
    &--selected {
      border-color: ${({ theme }) => theme.palette.primary.main};
    }
  }

  ${({ theme }) => theme.breakpoints.down("sm")} {
    padding: 4.8rem 3rem;
  }
`;

export const StyledEditable = styled(Editable)`
  display: flex;
  flex-direction: column;
  gap: 4.8rem;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    gap: 3.6rem;
  }
`;

export const StoryTitle = styled(TextField)`
  padding: 0rem 1.6rem;
  border-left: solid 3px #aaa;
  margin-bottom: 2.4rem;

  &.focused {
    border-color: ${({ theme }) => theme.palette.primary.main};
  }
`;

export const ToolbarFab = styled(Fab)`
  position: fixed;
  right: 24px;
  bottom: 24px;
`;
