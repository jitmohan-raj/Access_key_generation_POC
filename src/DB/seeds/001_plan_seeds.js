exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("plans").del();

  // Inserts seed entries
  await knex("plans").insert([
    {
      name: "free",
      feature_limit: 3,
      duration_days: 30, // e.g., 1 month
    },
    {
      name: "basic",
      feature_limit: 5,
      duration_days: 90, // 3 months
    },
    {
      name: "standard",
      feature_limit: 8,
      duration_days: 180, // 6 months
    },
    {
      name: "advance",
      feature_limit: 11,
      duration_days: 365, // 1 year
    },
  ]);
};
