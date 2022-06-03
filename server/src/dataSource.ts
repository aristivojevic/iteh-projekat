import { DataSource } from "typeorm";

export const appDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "",
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  database: "mreza",
})