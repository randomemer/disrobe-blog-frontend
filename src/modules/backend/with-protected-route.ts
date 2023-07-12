import nookies from "nookies";
import admin from "./admin";
import { AuthorModel } from ".";
import { jsonify } from "@/modules/utils";

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
    const { req, res } = context;
    try {
      const cookies = nookies.get(context);
      const token = await admin.auth().verifyIdToken(cookies.token);

      const result = await AuthorModel.query().findById(token.uid);
      if (!result) throw new Error("No author found");

      const transformed = jsonify(result.toJSON());

      req.user = { author: transformed };

      return handler(context);
    } catch (error) {
      console.error("Error while authenticating", error);
      res.writeHead(302, { Location: `/auth?type=login&redirect=${req.url}` });
      res.end();

      return { props: {} as P };
    }
  };
}
