import { DataSource } from "typeorm";


export const appDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || 'localhost',
  port: 3306,
  username: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  database: process.env.DB_NAME || "kursevi",
})