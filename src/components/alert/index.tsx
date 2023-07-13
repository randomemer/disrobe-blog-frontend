import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import { MouseEventHandler } from "react";

interface AlertModalProps extends DialogProps {
  title: string;
  description: string;
  actions: {
    label: string;
    ActionProps?: ButtonProps;
    handler: MouseEventHandler<HTMLButtonElement>;
  }[];
}

export default function AlertModal(props: AlertModalProps) {
  const { title, description, actions, ...other } = props;

  return (
    <Dialog {...other}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {actions.map((action, i) => (
          <Button key={i} onClick={action.handler} {...action.ActionProps}>
            {action.label}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
}
