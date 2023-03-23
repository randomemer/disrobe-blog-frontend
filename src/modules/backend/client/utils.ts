import type { FirestoreTimestampJSON } from "@/types/backend";
import { Timestamp } from "firebase/firestore";

export function timestampToJSON(timestamp: Timestamp) {
  return {
    seconds: timestamp.seconds,
    nanoseconds: timestamp.nanoseconds,
  };
}

export function timestampFromJSON(json: FirestoreTimestampJSON) {
  return new Timestamp(json.seconds, json.nanoseconds);
}
