import { Checkbox, FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";

export const LoginOptions = styled("div")`
  /* margin-top: 2.8rem; */
  display: flex;
  justify-content: space-between;
`;

export const CheckboxLabel = styled(FormControlLabel)`
  .MuiFormControlLabel-label {
    font-size: 1.4rem;
  }
`;

export const RememberMeCheckbox = styled(Checkbox)``;
