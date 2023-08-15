import type {
  AuthorModel,
  StoryModel,
  StorySnapshotModel,
} from "@/modules/backend";

export type JSONMappings = {
  Date: string;
};

export type JSONEncodable<T> = {
  [K in keyof T]: K extends keyof JSONMappings ? JSONMappings[K] : T[K];
};

export interface AuthorJSON extends JSONEncodable<AuthorModel> {}

export interface StorySnapshotJSON extends JSONEncodable<StorySnapshotModel> {}

export interface StoryJoinedJSON extends JSONEncodable<StoryModel> {}
