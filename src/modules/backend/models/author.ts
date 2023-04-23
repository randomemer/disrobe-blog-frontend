import { JSONSchema, Model } from "objection";

export default class AuthorModel extends Model {
  static tableName = "Author";
  static idColumn = "id";

  id!: string;
  name!: string;
  bio!: string | null;
  picture!: string | null;
  created_at!: Date;
  updated_at!: Date;

  static jsonSchema: JSONSchema = {
    type: " object",
    required: ["id", "name"],
    properties: {
      id: { type: "string" },
      name: { type: "string" },
      bio: { type: ["string", "null"] },
      picture: { type: ["string", "null"] },
      created_at: { type: "string" },
      updated_at: { type: "string" },
    },
    additionalProperties: false,
  };

  $beforeInsert() {
    this.created_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}
