import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  LinearProgress,
  TextField,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { svgIconClasses } from "@mui/material/SvgIcon";

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
  .Mui-focused {
    .${svgIconClasses.root} {
      color: ${({ theme }) => theme.palette.primary.main};
    }
  }
`;

export const ORDivider = styled(Divider)`
  width: 100%;
  font-size: 1.4rem;
`;

export const AddButton = styled(IconButton)`
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
