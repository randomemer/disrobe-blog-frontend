import { createContext, PropsWithChildren, useEffect } from "react";
import { Updater, useImmer } from "use-immer";
import { getAuth, User } from "firebase/auth";
import { AuthorJSON } from "@/types/backend";
import { AsyncStatus } from "@/types";
import axios from "axios";

export interface AuthContextData {
  status: AsyncStatus;
  uid: string | null;
  author: AuthorJSON | null;
}

export interface AuthProviderValue {
  auth: AuthContextData;
  setAuth: Updater<AuthContextData>;
}

export const AuthContext = createContext<AuthProviderValue>({
  auth: {
    status: AsyncStatus.IDLE,
    uid: null,
    author: null,
  },
  setAuth: () => {},
});

export default function AuthTestProvider(props: PropsWithChildren) {
  const [auth, setAuth] = useImmer<AuthContextData>({
    status: AsyncStatus.PENDING,
    uid: null,
    author: null,
  });

  const fetchAuthor = async () => {
    setAuth((auth) => {
      auth.status = AsyncStatus.PENDING;
    });
    try {
      const token = await getAuth().currentUser!.getIdToken();
      const user = await axios.get("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("fetched user", user);
      setAuth((auth) => {
        auth.status = AsyncStatus.FULFILLED;
      });
    } catch (error) {
      console.error(error);
      setAuth((auth) => {
        auth.status = AsyncStatus.REJECTED;
      });
    }
  };

  useEffect(() => {
    console.time("auth-user");
    return getAuth().onAuthStateChanged((user) => {
      console.timeEnd("auth-user");
      setAuth((auth) => {
        auth.uid = user?.uid ?? null;
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("auth user changed", auth.uid);
    if (auth.uid) {
      fetchAuthor();
    } else {
      setAuth((auth) => {
        auth.status = AsyncStatus.IDLE;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.uid]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
}
