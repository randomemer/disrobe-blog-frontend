// Update with your config settings.
const dotenv = require("dotenv");

dotenv.config({ path: `./env/.env.development` });

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: "mysql2",
    connection: process.env.DATABASE_URL,
    migrations: { directory: `./knex/migrations` },
    seeds: { directory: `./knex/seeds` },
  },

  production: {
    client: "mysql2",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
  },
};
