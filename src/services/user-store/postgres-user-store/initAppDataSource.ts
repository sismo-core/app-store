import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserEntity } from "./Entities/user.entity"

const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST,
    port: 5432,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    entities: [
        UserEntity
    ],
    synchronize: true,
    logging: false,
    ssl: true,
})

let initialize = null;

export const initAppDataSource = async () => {
  if (!initialize) initialize = AppDataSource.initialize();
  return initialize;
};
