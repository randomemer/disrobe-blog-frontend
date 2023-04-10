import { LoadingButton } from "@mui/lab";
import { Card, Tab, Tabs, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link, { LinkProps } from "next/link";

export const FormContainer = styled(Card)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: unset;

  display: flex;
  flex-direction: column;
  width: 42rem;
`;

export const FormTabs = styled(Tabs)`
  width: 100%;
`;

export const FormTab = styled(Tab<typeof Link>)`
  font-size: 1.8rem;
  letter-spacing: 0.5px;
`;

export const AuthForm = styled("form")`
  display: flex;
  flex-direction: column;
  padding: 3.6rem 1.8rem;
`;

export const FormHeader = styled("h2")`
  font-size: 2.4rem;
  align-self: center;
  margin-bottom: 5.6rem;
`;

export const FormFields = styled("div")`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  margin: 0 3.6rem 5.6rem;
`;

export const FormTextField = styled(TextField)`
  .MuiInput-root {
    font-size: 1.6rem;
  }

  .MuiSvgIcon-root {
    font-size: 2.4rem;
  }

  .Mui-focused {
    .MuiSvgIcon-root {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

export const FormButton = styled(LoadingButton)`
  /* border-width: 2px; */
  border-radius: 0;
  font-size: 1.8rem;
  align-self: flex-end;
`;
