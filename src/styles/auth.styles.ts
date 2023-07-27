import { LoadingButton } from "@mui/lab";
import { Box, Card, Tab, Tabs, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import Link from "next/link";

export const AuthPageContainer = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2.4rem;
`;

export const FormContainer = styled(Card)`
  border-radius: unset;

  display: flex;
  flex-direction: column;
  width: 42rem;

  ${({ theme }) => theme.breakpoints.down("md")} {
    width: 100%;
    max-width: 38rem;
  }
`;

export const FormTabs = styled(Tabs)`
  width: 100%;
`;

export const FormTab = styled(Tab<typeof Link>)`
  font-size: 1.8rem;
  letter-spacing: 0.5px;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 1.6rem;
  }
`;

export const AuthForm = styled("form")`
  display: flex;
  flex-direction: column;
  padding: 3.6rem 2.4rem;
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

  ${({ theme }) => theme.breakpoints.down("md")} {
    margin: 0 0 3.6rem;
  }
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
  border-radius: 0;
  font-size: 1.8rem;
  align-self: flex-end;

  ${({ theme }) => theme.breakpoints.down("sm")} {
    font-size: 1.6rem;
  }
`;
