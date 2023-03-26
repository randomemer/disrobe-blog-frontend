import type { AuthorJSON } from "./backend";
import type { GetServerSidePropsContext } from "next";
import { ReactNode } from "react";

declare module "next" {}

export interface SocialMediaIcon {
  colored?: boolean;
}

export type AsyncStatus = "idle" | "pending" | "fulfilled" | "rejected";

// ============================================================

export type User = {
  id: string;
  data: AuthorJSON;
};

// ============================================================

export type FormValue<T = any> = {
  value: T | null;
  error: boolean;
  errorMessage: string | null;
} & Record<string, any>;

export type FormValues<T = Record<string, any>> = {
  [K in keyof T]: FormValue<T[K]>;
};

export type FormValidators<T = Record<string, any>> = {
  [K in keyof T]: (value: T[K]) => string | null;
};

// ============================================================

export interface RouteProps {
  author?: AuthorJSON;
  [key: string]: unknown;
}

export interface PageRoute {
  (): null;
  getLayout(): ReactNode;
}

export type ProtectedRouteContext = GetServerSidePropsContext & {
  req: {
    user: {
      author: AuthorJSON;
    };
  };
};
