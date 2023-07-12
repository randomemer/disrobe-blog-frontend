import { JSONSchema, Model } from "objection";
import { Descendant } from "slate";

export default class StorySnapshotModel extends Model {
  static tableName = "StorySnapshot";
  static idColumn = ["id", "story_id"];

  id!: string;
  story_id!: string;
  title!: string;
  content!: Descendant[];
  timestamp!: string;

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
