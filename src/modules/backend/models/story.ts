import {
  JSONSchema,
  Model,
  ModelObject,
  RelationMappings,
  RelationMappingsThunk,
} from "objection";
import AuthorModel from "./author";
import StorySettingsModel from "./story-settings";
import StorySnapshotModel from "./story-snapshot";

interface StoryModel {
  id: string;
  is_published: boolean;

  author_id: string;
  author: ModelObject<AuthorModel>;

  draft_snap_id: string;
  draft: ModelObject<StorySnapshotModel>;

  live_snap_id: string | null;
  live: ModelObject<StorySnapshotModel> | null;

  settings: ModelObject<StorySettingsModel>;

  created_at: Date;
  updated_at: Date;
}

class StoryModel extends Model {
  static tableName = "Story";
  static idColumn = "id";

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
    settings: {
      relation: Model.HasOneRelation,
      modelClass: StorySettingsModel,
      join: {
        from: "Story.id",
        to: "StorySettings.story_id",
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

export default StoryModel;
