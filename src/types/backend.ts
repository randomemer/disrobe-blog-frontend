import type {
  AuthorModel,
  StoryModel,
  StorySnapshotModel,
} from "@/modules/backend";
import { ModelObject } from "objection";

export type JSONMappings = {
  Date: string;
};

export type JSONEncodable<T> = {
  [K in keyof T]: K extends keyof JSONMappings ? JSONMappings[K] : T[K];
};

export interface AuthorJSON extends JSONEncodable<ModelObject<AuthorModel>> {}

export interface StorySnapshotJSON
  extends JSONEncodable<ModelObject<StorySnapshotModel>> {}

export interface StoryJoinedJSON
  extends JSONEncodable<ModelObject<StoryModel>> {}
