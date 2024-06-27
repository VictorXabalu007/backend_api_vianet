import knex from "knex";

export const config = {
    client: 'mysql',
      connection: {
          host: "192.168.1.104",
          user: "banco",
          password: "test1723",
          database: "banco_farma"
      },
      migrations: {
        extension: "ts",
        directory: "./db/migrations"
      },
  };

export const kknex = knex(config);
