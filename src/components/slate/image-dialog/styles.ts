import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  LinearProgress,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";

export const ImageModalTitle = styled(DialogTitle)`
  font-size: 2.4rem;
`;

export const ImageModalContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  width: 45rem;
  height: 30rem;
`;

export const ImageModalActions = styled(DialogActions)``;

export const ImageURLField = styled(TextField)`
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

export const ORDivider = styled(Divider)`
  width: 100%;
  font-size: 1.4rem;
`;

export const AddButton = styled(Button)`
  min-width: unset;
`;

export const CloseButton = styled(Button)`
  font-size: 1.4rem;
`;

export const UploadInfo = styled("div")`
  margin: auto 0;
  display: flex;
  gap: 1.2rem;
  flex-direction: column;
`;

export const UploadProgress = styled(LinearProgress)``;

export const UploadStatus = styled("span")`
  align-self: flex-end;
  font-size: 1.4rem;
`;
