import { getAuth, User } from "firebase/auth";
import { createContext, useEffect } from "react";
import nookies from "nookies";
import { useImmer } from "use-immer";

import type { PropsWithChildren } from "react";
import type { Updater } from "use-immer";
import { AuthorJSON } from "@/types/backend";

export interface AuthContextData {
  user: User | null;
  author: AuthorJSON | null;
}

export interface AuthProviderValue {
  auth: AuthContextData;
  setAuth: Updater<AuthContextData>;
}

export const AuthContext = createContext<AuthProviderValue>({
  auth: {
    user: null,
    author: null,
  },
  setAuth: () => {},
});

type AuthProviderProps = PropsWithChildren<{
  author?: AuthorJSON;
}>;

export default function AuthProvider(props: AuthProviderProps) {
  const [auth, setAuth] = useImmer<AuthContextData>({
    user: null,
    author: props.author ?? null,
  });

  // listen for token changes
  // update state and set new token as a cookie
  useEffect(() => {
    return getAuth().onIdTokenChanged(async (user) => {
      if (!user) {
        setAuth((auth) => {
          auth.user = user;
        });
        nookies.set(undefined, "token", "", { path: "/" });
      } else {
        const token = await user.getIdToken();
        setAuth((auth) => {
          auth.user = user;
        });
        nookies.set(undefined, "token", token, { path: "/" });
      }
    });
  }, [setAuth]);

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = getAuth().currentUser;
      if (user) await user.getIdToken(true);
    }, 10 * 60 * 1000);

    return () => clearInterval(handle);
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
}
