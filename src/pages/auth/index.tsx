import LoginForm from "@/components/auth/login-form";
import SignupForm from "@/components/auth/signup-form";
import TabPanel from "@/components/tab-panel";
import { useSnackbar } from "material-ui-snackbar-provider";
import {
  AuthPageContainer,
  FormContainer,
  FormTab,
  FormTabs,
} from "@/styles/auth.styles";
import { FirebaseError } from "firebase/app";
import {
  browserLocalPersistence,
  browserSessionPersistence,
  getAuth,
  setPersistence,
  signInWithCustomToken,
  signInWithEmailAndPassword,
} from "firebase/auth";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useModal } from "mui-modal-provider";

import type { SyntheticEvent } from "react";

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
  const modal = useModal();
  const snackbar = useSnackbar();

  const routerQueryType = (router.query.type as string) || "login";

  const [redirect, setRedirect] = useState("/settings/profile");
  const [isLoading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<string>(routerQueryType);

  const observerBoxRef = useRef<HTMLDivElement>(null);

  const onTabChange = (event: SyntheticEvent<Element, Event>, tab: string) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const redirect = router.query.redirect;

    if (redirect) {
      const url = decodeURIComponent(redirect as string);
      setRedirect(url);
    }
  }, [router.query.redirect]);

  useEffect(() => {
    if (routerQueryType !== activeTab) {
      setActiveTab(routerQueryType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  const loginUser: LoginHandler = async (data, shouldRemember) => {
    setLoading(true);
    try {
      const auth = getAuth();

      if (shouldRemember) {
        await setPersistence(auth, browserLocalPersistence);
        console.log("set local persistence");
      } else {
        await setPersistence(auth, browserSessionPersistence);
      }

      await signInWithEmailAndPassword(auth, data.email, data.password);

      // logEvent(analytics, "login", {
      //   method: "email",
      // });

      router.push(redirect);
    } catch (error) {
      if (error instanceof FirebaseError) {
        snackbar.showMessage(error.message, "OK", () => {}, {
          severity: "error",
        } as any);
      }
      console.error(error);
    }
    setLoading(false);
  };

  const signupUser: SignupHandler = async (data) => {
    setLoading(true);
    try {
      const auth = getAuth();

      const resp = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
          displayName: data.full_name,
        }),
      });
      const body = await resp.json();
      if (!resp.ok) {
        throw { message: body.error };
      }

      await signInWithCustomToken(auth, body.token);

      // logEvent(analytics, "sign_up", {
      //   method: "email",
      // });
      router.push("/settings/profile");
    } catch (error) {
      snackbar.showMessage((error as Error).message, "OK", () => {}, {
        severity: "error",
      } as any);
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Head>
        <title>Auth</title>
      </Head>

      <AuthPageContainer>
        <FormContainer>
          <FormTabs
            variant="fullWidth"
            value={activeTab}
            onChange={onTabChange}
          >
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
      </AuthPageContainer>
    </>
  );
}

function tabProps(key: string) {
  return { id: `auth-tab-${key}`, "aria-controls": `auth-tabpanel-${key}` };
}
