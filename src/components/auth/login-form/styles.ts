import { Checkbox, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import { formControlLabelClasses } from "@mui/material/FormControlLabel";

export const LoginOptions = styled("div")`
  /* margin-top: 2.8rem; */
  display: flex;
  justify-content: space-between;
`;

export const CheckboxLabel = styled(FormControlLabel)`
  .${formControlLabelClasses.label} {
    font-size: 1.4rem;
  }
`;

export const RememberMeCheckbox = styled(Checkbox)``;
