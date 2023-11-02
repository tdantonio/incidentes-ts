import "reflect-metadata"
import { DataSource } from "typeorm"
import { Incidente } from "./entity/Incidente"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "tpa-pmr-g14",
    synchronize: true,
    logging: false,
    entities: [Incidente],
    migrations: [],
    subscribers: [],
})
