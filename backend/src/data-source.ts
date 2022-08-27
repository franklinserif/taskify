import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./db/entity/User";
import config from "./config";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});