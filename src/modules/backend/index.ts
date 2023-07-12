import knex from "knex";
import { Model } from "objection";

import StoryModel from "./models/story";
import AuthorModel from "./models/author";
import StorySnapshotModel from "./models/story-snapshot";

const knexClient = knex({
  client: "mysql2",
  connection: process.env.DATABASE_URL,
});

Model.knex(knexClient);

export default knexClient;

export { StoryModel, AuthorModel, StorySnapshotModel };
