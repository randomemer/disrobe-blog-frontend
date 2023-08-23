const data = require("./data/story-snapshot.json");

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("StorySnapshot").del();

  for (const item of data) {
    item.content = JSON.stringify(item.content);
    item.timestamp = new Date(item.timestamp);
  }

  await knex("StorySnapshot").insert(data);
};
