import admin from "firebase-admin";

import type { FirestoreTimestampJSON } from "@/types/backend";
import type { FirestoreTimestamp } from "@/types/backend/admin";

export function timestampToJSON(timestamp: FirestoreTimestamp) {
  return {
    seconds: timestamp.seconds,
    nanoseconds: timestamp.nanoseconds,
  };
}

export function timestampFromJSON(json: FirestoreTimestampJSON) {
  return new admin.firestore.Timestamp(json.seconds, json.nanoseconds);
}
