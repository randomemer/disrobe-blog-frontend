import { AuthContext } from "@/contexts/auth";
import { useContext } from "react";

import type { Updater } from "use-immer";
import type { AuthContextData } from "@/contexts/auth";

export default function useAuth(): [AuthContextData, Updater<AuthContextData>] {
  const { auth, setAuth } = useContext(AuthContext);

  return [auth, setAuth];
}
