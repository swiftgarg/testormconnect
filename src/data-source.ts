import "reflect-metadata"
import { DataSource } from "typeorm"
import { Tax } from "./entity/Tax"

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123456',
    database: 'postgres',
    synchronize: true,
    logging: false,
    entities: [Tax],
    migrations: [],
    subscribers: [],
})
