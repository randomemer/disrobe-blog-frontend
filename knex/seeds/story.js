const data = require("./data/story.json");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("Story").del();

  const mapped = data.map((row) => {
    row.created_at = new Date(row.created_at);
    row.updated_at = new Date(row.updated_at);
    return row;
  });

  await knex("Story").insert(mapped);
};
