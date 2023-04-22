import BaseModel from "./base";

export default class AuthorModel extends BaseModel {
  static tableName = "Author";
  static idColumn = "id";

  id!: string;
  name!: string;
  bio?: string;
  picture?: string;
  created_at!: Date;
  updated_at!: Date;

  $beforeInsert() {
    this.created_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}
