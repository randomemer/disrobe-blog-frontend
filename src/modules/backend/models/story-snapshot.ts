import { JSONSchema, Model } from "objection";
import { Descendant } from "slate";

interface StorySnapshotModel {
  id: string;
  story_id: string;
  title: string;
  content: Descendant[];
  timestamp: string;
}

class StorySnapshotModel extends Model {
  static tableName = "StorySnapshot";
  static idColumn = "id";

  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["id", "story_id", "title", "content"],
    properties: {
      id: { type: "string" },
      story_id: { type: "string" },
      title: { type: "string" },
      content: { type: "array" },
      timestamp: { type: "string" },
    },
    additionalProperties: false,
  };
}

export default StorySnapshotModel;
