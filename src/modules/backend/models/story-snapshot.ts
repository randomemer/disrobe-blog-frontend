import { Descendant } from "slate";
import BaseModel from "./base";

export default class StorySnapshotModel extends BaseModel {
  static tableName = "StorySnapshot";
  static idColumn = ["id", "story_id"];

  id!: string;
  story_id!: string;
  title!: string;
  content!: Descendant[];
  timestamp!: string;
}
