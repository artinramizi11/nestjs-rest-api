import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Profile } from "./profile.entity";

@Entity()
export class User { 
    @PrimaryGeneratedColumn()
    id: number 

    @Column({unique: true})
    email: string 

    @Column()
    password: string 

    @Column()
    username: string

    @OneToMany(() => Product, product => product.user , {cascade: true})
    products: Product[]

    @OneToOne(() => Profile, profile => profile.user , {cascade: true})
    profile: Profile

    
}