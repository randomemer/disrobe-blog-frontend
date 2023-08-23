/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("StorySettings", function (table) {
    table.string("id");
    table.string("story_id");
    table.string("meta_title");
    table.string("meta_desc");
    table.string("meta_img");

    table.primary("id");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("StorySettings");
};
