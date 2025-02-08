import useAuth from "@/hooks/use-auth";
import { combineURLQuery } from "@/modules/utils";
import { AsyncStatus } from "@/types";
import { useRouter } from "next/router";
import { FC } from "react";

interface AuthHOCConfig {
  beforeAuth: FC;
  whenAuthed: FC;
}

export default function withAuth(config: AuthHOCConfig) {
  return function EnhancedComponent() {
    const [auth] = useAuth();
    const router = useRouter();

    switch (auth.status.user) {
      case AsyncStatus.PENDING: {
        return <config.beforeAuth />;
      }

      case AsyncStatus.FULFILLED: {
        if (!auth.uid) {
          const redirect = combineURLQuery("/auth", {
            type: "login",
            redirect: router.asPath,
          });
          router.push(redirect);

          return <config.beforeAuth />;
        } else return <config.whenAuthed />;
      }

      default: {
        return <>Error</>;
      }
    }
  };
}
