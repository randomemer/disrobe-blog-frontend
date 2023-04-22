import { LoginHandler } from "@/pages/auth";
import {
  AuthForm,
  FormButton,
  FormFields,
  FormHeader,
  FormTextField,
} from "@/styles/auth.styles";
import { createFormValue, validateSchemaField } from "@/modules/utils";
import {
  KeyRounded,
  LoginOutlined,
  MailOutlineRounded,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { useImmer } from "use-immer";
import { object, ObjectSchema, reach, string } from "yup";
import { CheckboxLabel, LoginOptions, RememberMeCheckbox } from "./styles";

import type { LoginFormData } from "@/pages/auth";
import type { FormErrors, FormValues } from "@/types";
import type { ChangeEventHandler, FormEventHandler } from "react";

const formData: FormValues<LoginFormData> = {
  email: createFormValue(""),
  password: createFormValue(""),
};

const loginSchema: ObjectSchema<LoginFormData> = object({
  email: string().trim().required("Email can't be empty").default(""),
  password: string().trim().required("Password can't be empty").default(""),
});

interface LoginFormState {
  values: LoginFormData;
  errors: FormErrors<LoginFormData>;
}

export interface LoginFormProps {
  loading: boolean;
  loginUser: LoginHandler;
}

export default function LoginForm(props: LoginFormProps) {
  const [{ values, errors }, setForm] = useImmer<LoginFormState>({
    values: loginSchema.cast({}),
    errors: {},
  });
  const [isPassHidden, setPassHidden] = useState(true);
  const [shouldRemember, setRemember] = useState(false);

  const validate = () => {
    const errors: string[] = [];

    setForm((form) => {
      let key: keyof LoginFormData;
      for (key in form.values) {
        const value = form.values[key];
        const field = reach(loginSchema, key) as any;
        const message = validateSchemaField(field, value);
        form.errors[key] = message;
        if (message) errors.push(message);
      }
    });

    return errors.length === 0;
  };

  const onValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const name = event.target.name as keyof LoginFormData;
    const value = event.target.value!;

    const field = reach(loginSchema, name) as any;
    const message = validateSchemaField(field, value);

    setForm((form) => {
      form.values[name] = value;
      form.errors[name] = message;
    });
  };

  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    if (!validate()) return;
    props.loginUser(values, shouldRemember);
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
          value={values.email}
          onChange={onValueChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <MailOutlineRounded />
              </InputAdornment>
            ),
          }}
          error={!!errors.email}
          helperText={errors.email}
        />

        <FormTextField
          type={isPassHidden ? "password" : "text"}
          name="password"
          variant="standard"
          autoComplete="on"
          placeholder="Password"
          value={values.password}
          onChange={onValueChange}
          error={!!errors.password}
          helperText={errors.password}
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
