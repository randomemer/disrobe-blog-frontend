import { createContext, PropsWithChildren, useEffect } from "react";
import { Updater, useImmer } from "use-immer";
import { getAuth, User } from "firebase/auth";
import { AuthorJSON } from "@/types/backend";
import { AsyncStatus } from "@/types";
import axios from "axios";

export interface AuthContextData {
  status: { user: AsyncStatus; author: AsyncStatus };
  uid: string | null;
  author: AuthorJSON | null;
}

export interface AuthProviderValue {
  auth: AuthContextData;
  setAuth: Updater<AuthContextData>;
}

export const AuthContext = createContext<AuthProviderValue>({
  auth: {
    status: { user: AsyncStatus.IDLE, author: AsyncStatus.IDLE },
    uid: null,
    author: null,
  },
  setAuth: () => {},
});

function getAuthUser() {
  return new Promise<User | null>((resolve) => {
    getAuth().onAuthStateChanged((user) => resolve(user));
  });
}

export default function AuthTestProvider(props: PropsWithChildren) {
  const [auth, setAuth] = useImmer<AuthContextData>({
    status: { user: AsyncStatus.PENDING, author: AsyncStatus.IDLE },
    uid: null,
    author: null,
  });

  const fetchUser = async () => {
    setAuth((auth) => {
      auth.status.user = AsyncStatus.PENDING;
    });

    console.time("auth-user");
    const user = await getAuthUser();
    console.timeEnd("auth-user");

    setAuth((auth) => {
      auth.uid = user?.uid ?? null;
      auth.status.user = AsyncStatus.FULFILLED;
      if (user) auth.status.author = AsyncStatus.PENDING;
    });
  };

  const fetchAuthor = async () => {
    setAuth((auth) => {
      auth.status.author = AsyncStatus.PENDING;
    });
    try {
      const token = await getAuth().currentUser!.getIdToken();
      const resp = await axios.get("/api/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAuth((auth) => {
        auth.status.author = AsyncStatus.FULFILLED;
        auth.author = resp.data;
      });
    } catch (error) {
      console.error(error);
      setAuth((auth) => {
        auth.status.author = AsyncStatus.REJECTED;
      });
    }
  };

  useEffect(() => {
    fetchUser();
    if (auth.status.user === AsyncStatus.IDLE) {
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log("auth user changed", auth.uid);
    if (auth.uid) {
      fetchAuthor();
    } else {
      setAuth((auth) => {
        auth.status.author = AsyncStatus.IDLE;
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
