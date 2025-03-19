import { DataSource, DataSourceOptions } from "typeorm";
import * as dotenv from "dotenv"
dotenv.config()

export const dbDataSource: DataSourceOptions =  { 
    url: process.env.dbUrl,
    type: "postgres",
    port: 3306,
    entities: ['dist/entities/*.js'],
    migrations: ['dist/migrations/*.js'],
    synchronize: false 

}

const dataSource = new DataSource(dbDataSource)

export default dataSource