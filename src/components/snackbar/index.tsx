import { ErrorSharp, InfoSharp, WarningSharp } from "@mui/icons-material";
import {
  Alert,
  AlertColor,
  Button,
  ButtonProps,
  Snackbar,
  SnackbarProps,
} from "@mui/material";
import { CheckboxMarkedCircleOutline } from "mdi-material-ui";

export type AppSnackbarCustomParams = {
  severity?: AlertColor;
  autoHideDuration?: number;
};

export type CustomSnackbarProps = {
  message?: string;
  action?: string;
  ButtonProps?: Partial<ButtonProps>;
  SnackbarProps: Partial<SnackbarProps>;
  customParameters?: AppSnackbarCustomParams;
};

export default function AppSnackbar(props: CustomSnackbarProps) {
  const { message, action, customParameters } = props;

  return (
    <Snackbar
      {...props.SnackbarProps}
      autoHideDuration={customParameters?.autoHideDuration || 4000}
      anchorOrigin={{
        horizontal: "center",
        vertical: "bottom",
      }}
    >
      <Alert
        iconMapping={{
          info: <InfoSharp />,
          error: <ErrorSharp />,
          warning: <WarningSharp />,
          success: <CheckboxMarkedCircleOutline />,
        }}
        severity={customParameters?.severity}
        action={
          action && (
            <Button {...props.ButtonProps} color="secondary">
              {action}
            </Button>
          )
        }
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
