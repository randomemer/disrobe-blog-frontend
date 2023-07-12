import { SignupFormData, SignupHandler } from "@/pages/auth";
import {
  AuthForm,
  FormButton,
  FormFields,
  FormHeader,
  FormTextField,
} from "@/styles/auth.styles";
import { FormErrors } from "@/types";
import { validateSchemaField } from "@/modules/utils";
import {
  KeyOutlined,
  MailOutlineRounded,
  PersonAddOutlined,
  PersonOutlineRounded,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import { ChangeEventHandler, FormEventHandler, useState } from "react";
import { useImmer } from "use-immer";
import { object, ObjectSchema, reach, string } from "yup";

const signupSchema: ObjectSchema<SignupFormData> = object({
  full_name: string().trim().required().default(""),
  email: string().trim().required().default(""),
  password: string().trim().required().default(""),
});

export interface SignupFormProps {
  loading: boolean;
  signupUser: SignupHandler;
}

export interface SignupFormState {
  values: SignupFormData;
  errors: FormErrors<SignupFormData>;
}

export default function SignupForm(props: SignupFormProps) {
  const [{ values, errors }, setForm] = useImmer<SignupFormState>({
    values: signupSchema.cast({}),
    errors: {},
  });

  const [isPassHidden, setPassHidden] = useState(true);

  const validate = () => {
    const errors: string[] = [];

    setForm((form) => {
      let key: keyof SignupFormData;
      for (key in form.values) {
        const value = form.values[key];
        const field = reach(signupSchema, key) as any;
        const message = validateSchemaField(field, value);
        form.errors[key] = message;
        if (message) errors.push(message);
      }
    });

    return errors.length === 0;
  };

  const onValueChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    const name = event.target.name as keyof SignupFormData;
    const value = event.target.value!;

    const field = reach(signupSchema, name) as any;
    const message = validateSchemaField(field, value);

    setForm((form) => {
      form.values[name] = value;
      form.errors[name] = message;
    });
  };

  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    if (!validate()) return;
    props.signupUser(values);
  };

  return (
    <AuthForm onSubmit={onFormSubmit}>
      <FormHeader>Join us today!</FormHeader>

      <FormFields>
        <FormTextField
          type="text"
          name="full_name"
          variant="standard"
          placeholder="Full name"
          value={values.full_name}
          onChange={onValueChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineRounded />
              </InputAdornment>
            ),
          }}
          error={!!errors.full_name}
          helperText={errors.full_name}
        />

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
          placeholder="Password"
          value={values.password}
          onChange={onValueChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <KeyOutlined />
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
          error={!!errors.password}
          helperText={errors.password}
        />
      </FormFields>

      <FormButton
        type="submit"
        variant="outlined"
        loading={props.loading}
        loadingPosition="start"
        startIcon={<PersonAddOutlined />}
        onClick={onFormSubmit}
      >
        Sign Up
      </FormButton>
    </AuthForm>
  );
}
