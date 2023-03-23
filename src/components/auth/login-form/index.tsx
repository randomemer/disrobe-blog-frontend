import {
  AuthForm,
  FormButton,
  FormFields,
  FormHeader,
  FormTextField,
} from "@/styles/auth.styles";
import { createFormValue, FORM_VALIDATORS, getFormData } from "@/utils";
import {
  KeyRounded,
  LoginOutlined,
  MailOutlineRounded,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { CheckboxLabel, LoginOptions, RememberMeCheckbox } from "./styles";
import { useImmerReducer } from "use-immer";
import { formDataReducer, LoginHandler } from "@/pages/auth";

import type { LoginFormData } from "@/pages/auth";
import type { FormValues } from "@/types";
import type {
  FocusEventHandler,
  ChangeEventHandler,
  FormEventHandler,
} from "react";

const formData: FormValues<LoginFormData> = {
  email: createFormValue(""),
  password: createFormValue(""),
};

export interface LoginFormProps {
  loading: boolean;
  loginUser: LoginHandler;
}

export default function LoginForm(props: LoginFormProps) {
  const [data, dispatch] = useImmerReducer(formDataReducer, formData);
  const [isPassHidden, setPassHidden] = useState(true);
  const [shouldRemember, setRemember] = useState(false);

  const isFormDataValid = () => {
    let flag = true;

    let key: keyof LoginFormData;
    for (key in data) {
      const { value } = data[key];
      const error = FORM_VALIDATORS[key](value) !== null;
      dispatch({ type: "validate_field", field: key });

      if (error) {
        flag = false;
      }
    }

    return flag;
  };

  const onValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    dispatch({
      type: "value_change",
      field: event.target.name as keyof LoginFormData,
      value: event.target.value,
    });
  };

  const onInputBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    dispatch({
      type: "validate_field",
      field: event.target.name as keyof LoginFormData,
    });
  };

  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    dispatch({ type: "validate_all" });

    if (!isFormDataValid()) {
      // @TODO : show modal / toast with error
    } else {
      const formData = getFormData(data);
      props.loginUser(formData, shouldRemember);
    }
  };

  return (
    <AuthForm onSubmit={onFormSubmit}>
      <FormHeader>Welcome back!</FormHeader>

      <FormFields>
        <FormTextField
          type="email"
          name="email"
          variant="standard"
          placeholder="Email"
          value={data.email.value}
          onChange={onValueChange}
          onBlur={onInputBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineRounded />
              </InputAdornment>
            ),
          }}
          error={data.email.error}
          helperText={data.email.errorMessage}
        />

        <FormTextField
          type={isPassHidden ? "password" : "text"}
          name="password"
          variant="standard"
          placeholder="Password"
          value={data.password.value}
          onChange={onValueChange}
          onBlur={onInputBlur}
          error={data.password.error}
          helperText={data.password.errorMessage}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyRounded />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  onClick={() => setPassHidden((val) => !val)}
                >
                  {isPassHidden ? (
                    <VisibilityOutlined />
                  ) : (
                    <VisibilityOffOutlined />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <LoginOptions>
          <CheckboxLabel
            label="Remember me"
            control={
              <RememberMeCheckbox
                value={shouldRemember}
                onChange={(event) => setRemember(event.target.checked)}
              />
            }
          />
        </LoginOptions>
      </FormFields>

      <FormButton
        type="submit"
        variant="outlined"
        loadingPosition="start"
        loading={props.loading}
        startIcon={<LoginOutlined />}
        onClick={onFormSubmit}
      >
        Login
      </FormButton>
    </AuthForm>
  );
}
