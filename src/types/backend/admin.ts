import admin from "firebase-admin";
import { AuthorJSON } from ".";

const Timestamp = admin.firestore.Timestamp;

export type FirestoreTimestamp = InstanceType<typeof Timestamp>;

// ============================================================

export type AuthorDocumentData = Omit<AuthorJSON, "id">;

// ============================================================

export type StoryDocumentVersionData = {
  title: string;
  content: string;
  timestamp: FirestoreTimestamp;
};

// ============================================================

export type StoryDocumentData = {
  author: string;
  created_at: FirestoreTimestamp;
  is_published: boolean;
  data: {
    live?: StoryDocumentVersionData;
    draft: StoryDocumentVersionData;
  };
};
