import { Card, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LinkEditorBox = styled(Card)`
  padding: 0.6rem 1.2rem;
`;

export const LinkEditorField = styled(TextField)`
  .MuiInput-root {
    font-size: 1.8rem;
  }

  .MuiButton-root {
    min-width: unset;
  }

  .MuiSvgIcon-root {
    font-size: 2.4rem;
  }
`;
