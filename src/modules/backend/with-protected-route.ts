import AdminAuthorRepo from "./admin/repos/author";
import nookies from "nookies";
import admin from "./admin";

import type { GetServerSidePropsResult } from "next";
import type { ProtectedRouteContext } from "@/types";

export default function withProtectedRoute<
  P extends { [key: string]: unknown } = { [key: string]: unknown }
>(
  handler: (
    context: ProtectedRouteContext
  ) => GetServerSidePropsResult<P> | Promise<GetServerSidePropsResult<P>>
): (context: ProtectedRouteContext) => Promise<GetServerSidePropsResult<P>> {
  return async (context) => {
    console.log("middleware called");
    const { req, res } = context;
    try {
      const cookies = nookies.get(context);
      const token = await admin.auth().verifyIdToken(cookies.token);

      console.log("cookies.token", cookies.token);

      const author = await new AdminAuthorRepo().fetchId(token.uid);

      console.log(token.uid, author);

      req.user = { author: author.toJSON() };

      return handler(context);
    } catch (error) {
      console.error("Error while authenticating", error);
      res.writeHead(302, { Location: "/auth?type=login" });
      res.end();

      return { props: {} as P };
    }
  };
}
