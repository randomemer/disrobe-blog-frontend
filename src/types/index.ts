import type { AuthorModel } from "@/modules/backend";
import type { GetServerSidePropsContext } from "next";
import type { ModelObject } from "objection";
import type { ReactNode } from "react";
import { AuthorJSON } from "./backend";

declare module "next" {}

export interface SocialMediaIcon {
  colored?: boolean;
}

export type AsyncStatus = "idle" | "pending" | "fulfilled" | "rejected";

// ============================================================

export type User = {
  id: string;
  data: ModelObject<AuthorModel>;
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

export type FormErrors<T> = {
  [K in keyof T]?: string;
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
