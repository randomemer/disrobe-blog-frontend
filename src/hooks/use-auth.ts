import { AuthContext, AuthContextData } from "@/contexts/auth";
import { useContext } from "react";
import { Updater } from "use-immer";

export default function useAuth(): [AuthContextData, Updater<AuthContextData>] {
  const { auth, setAuth } = useContext(AuthContext);

  return [auth, setAuth];
}
