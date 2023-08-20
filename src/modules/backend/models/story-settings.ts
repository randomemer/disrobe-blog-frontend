import { JSONSchema, Model } from "objection";

interface StorySettingsModel {
  id: string;
  story_id: string;
  meta_title: string | null;
  meta_desc: string | null;
  meta_img: string | null;
}

class StorySettingsModel extends Model {
  static tableName: string = "StorySettings";
  static idColumn: string | string[] = "id";

  static jsonSchema: JSONSchema = {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" },
      story_id: { type: "string" },
      meta_title: { type: ["string", "null"] },
      meta_desc: { type: ["string", "null"] },
      meta_img: { type: ["string", "null"] },
    },
    additionalProperties: false,
  };
}

export default StorySettingsModel;
