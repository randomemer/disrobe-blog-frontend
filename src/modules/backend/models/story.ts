import { Model, ModelObject } from "objection";
import AuthorModel from "./author";
import BaseModel from "./base";
import StorySnapshotModel from "./story-snapshot";

export default class StoryModel extends BaseModel {
  static tableName = "Story";
  static idColumn = "id";

  id!: string;
  author_id!: string;
  is_published!: number;
  draft_snap_id!: string;
  live_snap_id?: string;
  created_at!: Date;
  updated_at!: Date;

  author!: ModelObject<AuthorModel>;
  draft!: ModelObject<StorySnapshotModel>;

  static relationMappings = {
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
  };

  $beforeInsert() {
    this.created_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}
