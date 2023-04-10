import { formDataReducer, SignupHandler } from "@/pages/auth";
import {
  AuthForm,
  FormButton,
  FormFields,
  FormHeader,
  FormTextField,
} from "@/styles/auth.styles";
import { createFormValue, FORM_VALIDATORS, getFormData } from "@/utils";
import {
  KeyOutlined,
  MailOutlineRounded,
  PersonAddOutlined,
  PersonOutlineRounded,
  VisibilityOffOutlined,
  VisibilityOutlined,
} from "@mui/icons-material";
import { IconButton, InputAdornment } from "@mui/material";
import {
  ChangeEventHandler,
  FocusEventHandler,
  FormEventHandler,
  useState,
} from "react";
import { useImmerReducer } from "use-immer";

const formData = {
  full_name: createFormValue(""),
  email: createFormValue(""),
  password: createFormValue(""),
};

export interface SignupFormProps {
  loading: boolean;
  signupUser: SignupHandler;
}

export default function SignupForm(props: SignupFormProps) {
  const [data, dispatch] = useImmerReducer(formDataReducer, formData);
  const [isPassHidden, setPassHidden] = useState(true);

  const isFormDataValid = () => {
    let flag = true;
    for (const key in data) {
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
      field: event.target.name,
      value: event.target.value,
    });
  };

  const onInputBlur: FocusEventHandler<HTMLInputElement> = (event) => {
    dispatch({
      type: "validate_field",
      field: event.target.name,
    });
  };

  const onFormSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    dispatch({ type: "validate_all" });

    if (!isFormDataValid()) {
      // @TODO : show modal / toast with error
    } else {
      const formData = getFormData(data);
      props.signupUser(formData);
    }
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
          value={data.full_name.value}
          onChange={onValueChange}
          onBlur={onInputBlur}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonOutlineRounded />
              </InputAdornment>
            ),
          }}
          error={data.full_name.error}
          helperText={data.full_name.errorMessage}
        />

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
          error={data.password.error}
          helperText={data.password.errorMessage}
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
