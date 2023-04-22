/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("Story").del();
  await knex("Story").insert(data);
};

const data = [
  {
    id: "AQYAqicxqM",
    author_id: "cAKzofeb5Ia1Bd9VEo1UV4JCjyL2",
    is_published: false,
    draft_snap_id: "aa7d6aad-f6bd-4399-8e8e-89cadb0aa47c",
    live_snap_id: null,
    created_at: new Date(1681649604174),
    updated_at: new Date(1681649604174),
  },
  {
    id: "ne3lxhdiyu",
    author_id: "cAKzofeb5Ia1Bd9VEo1UV4JCjyL2",
    is_published: false,
    draft_snap_id: "f8d9aca9-8c8c-4749-8604-fc35ec3bdced",
    live_snap_id: null,
    created_at: new Date(1681649606458),
    updated_at: new Date(1681649606458),
  },
  {
    id: "TyR97YTzbK",
    author_id: "cAKzofeb5Ia1Bd9VEo1UV4JCjyL2",
    is_published: true,
    draft_snap_id: "1f2b778a-2b2f-457b-babe-8c49fce8f30d",
    live_snap_id: "1f2b778a-2b2f-457b-babe-8c49fce8f30d",
    created_at: new Date(1681649608262),
    updated_at: new Date(1681649608262),
  },
];
