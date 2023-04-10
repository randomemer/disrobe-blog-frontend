import LoginForm from "@/components/auth/login-form";
import SignupForm from "@/components/auth/signup-form";
import TabPanel from "@/components/tab-panel";
import { FormContainer, FormTab, FormTabs } from "@/styles/auth.styles";
import { FORM_VALIDATORS } from "@/utils";
import { FirebaseError } from "firebase/app";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";

import type { ImmerReducer } from "use-immer";
import type { SyntheticEvent } from "react";
import { FormValues } from "@/types";

export type LoginFormData = {
  email: string;
  password: string;
};

export type SignupFormData = {
  full_name: string;
  email: string;
  password: string;
};

export type LoginHandler = (
  data: LoginFormData,
  shouldRemember: boolean
) => Promise<void>;

export type SignupHandler = (data: SignupFormData) => Promise<void>;

export default function AuthRoute() {
  const router = useRouter();

  const routerQueryType = router.query.type as string;
  const [isLoading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(
    routerQueryType || "login"
  );

  // const formBoxRef = useRef();
  const observerBoxRef = useRef<HTMLDivElement>(null);

  const onTabChange = (event: SyntheticEvent<Element, Event>, tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (routerQueryType !== activeTab) {
      setActiveTab(routerQueryType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  useEffect(() => {}, [activeTab]);

  const loginUser: LoginHandler = async (data, shouldRemember) => {
    setLoading(true);
    try {
      const auth = getAuth();

      if (shouldRemember) {
        await setPersistence(auth, browserLocalPersistence);
      } else {
        await setPersistence(auth, browserSessionPersistence);
      }

      const result = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );

      // logEvent(analytics, "login", {
      //   method: "email",
      // });

      // @TODO :
      router.push("/settings/account");
    } catch (error) {
      if (error instanceof FirebaseError) {
        switch (error.code) {
          case "auth/too-many-requests":
            console.log(
              "You have exceeded the number of login attempts. Please reset your password or try again later."
            );
            break;
          case "auth/wrong-password":
            console.log("Your password in incorrect");
            break;
          default:
            break;
        }
      }
      console.error(error);
      console.log(JSON.stringify(error, Object.getOwnPropertyNames(error)));
    }
    setLoading(false);
  };

  const signupUser: SignupHandler = async (data) => {
    setLoading(true);
    try {
      console.log(data);
      const auth = getAuth();
      const db = getFirestore();
      // create new user
      const credentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      // logEvent(analytics, "sign_up", {
      //   method: "email",
      // });
      console.log(credentials);

      // add document to authors collection
      const docRef = doc(db, "authors", credentials.user.uid);
      await setDoc(docRef, {
        name: data.full_name,
      });

      // @TODO :
      // router.push("/settings/account")
    } catch (error) {
      if (error instanceof FirebaseError) {
        console.log(error.code, error.name, error.message);
      }
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Auth</title>
      </Head>

      <FormContainer>
        <FormTabs variant="fullWidth" value={activeTab} onChange={onTabChange}>
          <FormTab
            value="login"
            href="/auth?type=login"
            label="Login"
            component={Link}
            {...tabProps("login")}
          />

          <FormTab
            value="signup"
            href="/auth?type=signup"
            label="Sign Up"
            component={Link}
            {...tabProps("register")}
          />
        </FormTabs>

        <div ref={observerBoxRef}>
          <TabPanel index="login" value={activeTab} label="auth">
            <LoginForm loading={isLoading} loginUser={loginUser} />
          </TabPanel>

          <TabPanel index="signup" value={activeTab} label="auth">
            <SignupForm loading={isLoading} signupUser={signupUser} />
          </TabPanel>
        </div>
      </FormContainer>
    </>
  );
}

function tabProps(key: string) {
  return { id: `auth-tab-${key}`, "aria-controls": `auth-tabpanel-${key}` };
}

export type FormReducerAction<T> =
  | {
      type: "value_change";
      field: keyof T;
      value: T[keyof T];
    }
  | { type: "validate_field"; field: keyof T }
  | { type: "validate_all" };

export type FormImmerReducer<T> = ImmerReducer<
  FormValues<T>,
  FormReducerAction<T>
>;

export const formDataReducer: FormImmerReducer<
  LoginFormData | SignupFormData
> = (draft, action) => {
  let key: keyof typeof draft;
  switch (action.type) {
    case "value_change":
      draft[action.field].value = action.value;
      break;

    case "validate_field":
      key = action.field;
      const { value } = draft[key];
      const message = FORM_VALIDATORS[key](value);

      draft[key].error = message !== null;
      draft[key].errorMessage = message;

      break;

    case "validate_all":
      for (key in draft) {
        const { value } = draft[key];
        const message = FORM_VALIDATORS[key](value);

        draft[key].error = message !== null;
        draft[key].errorMessage = message;
      }

      break;
  }
};
