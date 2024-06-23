import { knex as conection, Knex } from "knex";

export const config: Knex.Config = {
    client: 'mysql',
      connection: {
          host: "",
          user: "",
          password: "",
          database: "banco_farma"
      },
      migrations: {
        extension: "ts",
        directory: "./db/migrations"
      }
  };

export const knex = conection(config)