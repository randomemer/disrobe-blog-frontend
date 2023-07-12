/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("Author").del();
  await knex("Author").insert(data);
};

const data = [
  {
    id: "cAKzofeb5Ia1Bd9VEo1UV4JCjyL2",
    name: "Shashank Pathipati",
    picture: "images/authors/cAKzofeb5Ia1Bd9VEo1UV4JCjyL2/1681137998188.jpg",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    created_at: new Date(1681649599759),
    updated_at: new Date(1681649599759),
  },
];
