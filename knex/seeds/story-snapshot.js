const data = require("./data/story-snapshot.json");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("StorySnapshot").del();
  await knex("StorySnapshot").insert(data);
};
