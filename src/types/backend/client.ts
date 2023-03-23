import type { Timestamp } from "firebase/firestore";
import { AuthorJSON } from ".";

// ============================================================

export type AuthorDocumentData = Omit<AuthorJSON, "id">;

// ============================================================

export type StoryDocumentVersionData = {
  title: string;
  content: string;
  timestamp: Timestamp;
};

export type StoryDocumentData = {
  author: string;
  is_published: boolean;
  created_at: Timestamp;
  data: {
    draft: StoryDocumentVersionData;
    live?: StoryDocumentVersionData;
  };
};
