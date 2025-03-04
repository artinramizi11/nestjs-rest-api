import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
import { User } from "./entities/user.entity";
import { Profile } from "./entities/profile.entity";
import { Product } from "./entities/product.entity";
import * as dotenv from "dotenv"
dotenv.config()

export const connectDb:PostgresConnectionOptions = {
    url: process.env.dbUrl,
    type: "postgres",
    port: 3306,
    entities: [User,Profile,Product],
    synchronize: true 
}