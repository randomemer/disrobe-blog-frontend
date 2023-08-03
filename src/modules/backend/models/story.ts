import {
  JSONSchema,
  Model,
  RelationMappings,
  RelationMappingsThunk,
} from "objection";
import AuthorModel from "./author";
import StorySnapshotModel from "./story-snapshot";

export default class StoryModel extends Model {
  static tableName = "Story";
  static idColumn = "id";

  id!: string;
  author_id!: string;
  is_published!: number;
  draft_snap_id!: string;
  live_snap_id?: string;
  created_at!: Date;
  updated_at!: Date;

  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["id", "author_id", "draft_snap_id"],
    properties: {
      id: { type: "string" },
      author_id: { type: "string" },
      is_published: { type: "boolean", default: false },
      draft_snap_id: { type: "string" },
      live_snap_id: { type: ["string", "null"] },
      created_at: { type: "string" },
      updated_at: { type: "string" },
    },
    additionalProperties: false,
  };

  static relationMappings: RelationMappings | RelationMappingsThunk = {
    author: {
      relation: Model.BelongsToOneRelation,
      modelClass: AuthorModel,
      join: {
        from: "Story.author_id",
        to: "Author.id",
      },
    },
    draft: {
      relation: Model.HasOneRelation,
      modelClass: StorySnapshotModel,
      join: {
        from: "Story.draft_snap_id",
        to: "StorySnapshot.id",
      },
    },
    live: {
      relation: Model.HasOneRelation,
      modelClass: StorySnapshotModel,
      join: {
        from: "Story.live_snap_id",
        to: "StorySnapshot.id",
      },
    },
  };

  $beforeInsert() {
    this.created_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}
