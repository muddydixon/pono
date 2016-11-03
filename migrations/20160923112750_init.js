
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTableIfNotExists("users", table =>{
      table.increments();
      table.string("username", 64).notNullable().unique();
      table.string("shadow",   64).notNullable();
      table.string("salt",     64).notNullable();
      table.timestamps();
    }),
    knex.schema.createTableIfNotExists("rules", table =>{
      table.increments();
      table.string("identifier", 32).notNullable();
      table.integer("user_id").unsigned().notNullable();
      table.string("name",  64).notNullable();
      table.enum("protocol", ["http:", "https:", "mqtt:", "mqtts:", "ws:", "wss:", "mysql:", "redis:", "fluent:", "coap:"]).defaultTo("http:");
      table.string("host", 256).notNullable();
      table.integer("port").unsigned().notNullable();
      table.text("payload").defaultTo("");
      table.timestamps();

      table.index(["user_id", "name"]);
    }),
    knex.schema.createTableIfNotExists("props", table =>{
      table.increments();
      table.integer("user_id").unsigned().notNullable();
      table.integer("rule_id").unsigned().notNullable();
      table.string("key",  64).notNullable();
      table.text("val").notNullable();
      table.timestamps();

      table.index(["user_id", "key"]);
    }),
    knex.schema.createTableIfNotExists("tokens", table =>{
      table.increments();
      table.integer("user_id").unsigned().notNullable();
      table.integer("rule_id").unsigned().notNullable();
      table.string("name",  64).notNullable();
      table.string("token", 64).notNullable().unique();
      table.string("whitelist", 512);
      table.timestamps();

      table.index(["user_id", "name"]);
    }),
    knex.schema.createTableIfNotExists("logs", table =>{
      table.increments();
      table.string("remote_addr").notNullable();
      table.integer("rule_id").unsigned().notNullable();
      table.integer("token_id").unsigned().notNullable();
      table.string("query").notNullable();
      table.timestamps();

    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTableIfExists("users"),
    knex.schema.dropTableIfExists("props"),
    knex.schema.dropTableIfExists("rules"),
    knex.schema.dropTableIfExists("tokens"),
    knex.schema.dropTableIfExists("logs"),
  ]);
};
