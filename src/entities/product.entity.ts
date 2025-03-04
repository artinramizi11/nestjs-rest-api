import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    product_name: string 

    @Column()
    product_price: number

    @Column()
    product_category: string 

    @ManyToOne(() => User, user => user.products , {onDelete:"CASCADE"})
    user: User

}