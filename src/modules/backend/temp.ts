import knex from "knex";

export default async function fix() {
  const db = knex({
    client: "mysql2",
    connection: process.env.DATABASE_URL,
  });
}
