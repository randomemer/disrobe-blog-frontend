import { Card, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { inputClasses } from "@mui/material/Input";
import { svgIconClasses } from "@mui/material/SvgIcon";
import { buttonClasses } from "@mui/material/Button";

export const LinkEditorBox = styled(Card)`
  padding: 0.6rem 1.2rem;
`;

export const LinkEditorField = styled(TextField)`
  .${inputClasses.root} {
    font-size: 1.8rem;
  }

  .${buttonClasses.root} {
    min-width: unset;
  }

  .${svgIconClasses.root} {
    font-size: 2.4rem;
  }
`;
