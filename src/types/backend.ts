import type { Descendant } from "slate";

export interface AuthorJSON {
  id: string;
  name: string;
  bio: string | null;
  picture: string | null;
  created_at: string;
  updated_at: string;
}

export interface StoryJoinedJSON {
  id: string;
  is_published: boolean;

  author_id: string;
  author: AuthorJSON;

  draft_snap_id: string;
  draft: StorySnapshotJSON;

  live_snap_id: string | null;
  live: StorySnapshotJSON | null;

  settings: StorySettings;

  created_at: string;
  updated_at: string;
}

export interface StorySnapshotJSON {
  id: string;
  story_id: string;
  title: string;
  content: Descendant[];
  created_at: string;
  updated_at: string;
}

export interface StorySettings {
  id: string;
  story_id: string;
  meta_title: string | null;
  meta_desc: string | null;
  meta_img: string | null;
  author_modified: boolean;
  created_at: string;
  updated_at: string;
}
