/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema
    .createTable("Story", function (table) {
      table.string("id").primary();
      table.string("author_id").notNullable();
      table.boolean("is_published").defaultTo(false);
      table.string("draft_snap_id").notNullable().unique();
      table.string("live_snap_id").unique();
      table.datetime("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP()"));
      table.datetime("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP()"));
    })

    .createTable("Author", function (table) {
      table.string("id").primary();
      table.string("name").notNullable();
      table.string("picture");
      table.text("bio");
      table.datetime("created_at").defaultTo(knex.raw("CURRENT_TIMESTAMP()"));
      table.datetime("updated_at").defaultTo(knex.raw("CURRENT_TIMESTAMP()"));
    })

    .createTable("StorySnapshot", function (table) {
      table.string("id");
      table.string("story_id");
      table.string("title").notNullable();
      table.json("content").notNullable();
      table.datetime("timestamp").defaultTo(knex.raw("CURRENT_TIMESTAMP()"));

      table.primary("id");
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema
    .dropTable("Story")
    .dropTable("Author")
    .dropTable("StorySnapshot");
};
