import { JSONSchema, Model } from "objection";

interface AuthorModel {
  id: string;
  name: string;
  bio: string | null;
  picture: string | null;
  created_at: Date;
  updated_at: Date;
}

class AuthorModel extends Model {
  static tableName = "Author";
  static idColumn = "id";

  static jsonSchema: JSONSchema = {
    type: "object",
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

export default AuthorModel;
