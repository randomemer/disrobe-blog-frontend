import type { Descendant } from "slate";

export abstract class IRepo<T> {
  abstract fetchId(id: string): Promise<T | undefined>;
  abstract fetchMany(ids: string[]): Promise<T[]>;
}

export abstract class FirestoreModel<DocType, JSONType> {
  // abstract new(data: DocType | JSONType): any;
  abstract toDocument(): DocType;
  abstract toJSON(): JSONType;
  static isDocument: (data: FirebaseFirestore.DocumentData) => boolean;
  static isJson: (data: Record<string, any>) => boolean;
}

export type FirestoreTimestampJSON = {
  seconds: number;
  nanoseconds: number;
};

// ============================================================

export type AuthorJSON = {
  id: string;
  name: string;
  picture?: string;
  bio?: string;
};

// ============================================================

export type StoryDataJSON = {
  title: string;
  content: Descendant[];
  timestamp: FirestoreTimestampJSON;
};

export type StoryJSON = {
  id: string;
  author: AuthorJSON;
  created_at: FirestoreTimestampJSON;
  is_published: boolean;
  data: {
    draft: StoryDataJSON;
    live?: StoryDataJSON;
  };
};

export type StoryDraftInput = Omit<StoryDataJSON, "timestamp">;
