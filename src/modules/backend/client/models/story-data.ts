import { FirestoreModel } from "@/types/backend";
import { Timestamp } from "firebase/firestore";
import { timestampFromJSON } from "../utils";

import type { StoryDataJSON } from "@/types/backend";
import type { StoryDocumentVersionData } from "@/types/backend/client";
import type { Descendant } from "slate";

export default class StoryVersionData extends FirestoreModel<
  StoryDocumentVersionData,
  StoryDataJSON
> {
  title: string;
  content: Descendant[];
  timestamp: Timestamp;

  constructor(data: StoryDocumentVersionData | StoryDataJSON) {
    super();

    this.title = data.title;

    if (StoryVersionData.isDocument(data)) {
      this.timestamp = data.timestamp;
      this.content = JSON.parse(data.content);
    } else {
      this.content = data.content;
      this.timestamp = timestampFromJSON(data.timestamp);
    }
  }

  static isDocument(
    data: FirebaseFirestore.DocumentData
  ): data is StoryDocumentVersionData {
    return (
      typeof data.content === "string" && data.timestamp instanceof Timestamp
    );
  }

  static isJson(data: Record<string, any>): data is StoryDataJSON {
    return Array.isArray(data.content) && typeof data.timestamp === "object";
  }

  toDocument(): StoryDocumentVersionData {
    return {
      title: this.title,
      content: JSON.stringify(this.content),
      timestamp: this.timestamp,
    };
  }

  toJSON() {
    return {
      title: this.title,
      content: this.content,
      timestamp: this.timestamp.toJSON(),
    };
  }
}
