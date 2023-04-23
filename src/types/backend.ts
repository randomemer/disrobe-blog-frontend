import { Descendant } from "slate";

export abstract class IRepo<T> {
  abstract fetchId(id: string): Promise<T | undefined>;
  abstract fetchMany(ids: string[]): Promise<T[]>;
}

// Base Model Data

export type StoryJSON = {
  id: string;
  author_id: string;
  is_published: boolean;
  draft_snap_id: string;
  live_snap_id: string | null;
  created_at: string;
  updated_at: string;
};

export type AuthorJSON = {
  id: string;
  name: string;
  picture: string | null;
  bio: string | null;
  created_at: string;
  updated_at: string;
};

export type StorySnapshotJSON = {
  id: string;
  story_id: string;
  title: string;
  content: Descendant[];
  timestamp: string;
};

// Joined Model Data

export type StoryJoinedJSON = StoryJSON & {
  author: AuthorJSON;
  draft: StorySnapshotJSON;
  live?: StorySnapshotJSON;
};
