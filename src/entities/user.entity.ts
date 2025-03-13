import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";
import { Profile } from "./profile.entity";
import { Role } from "src/enums/role.enum";

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

    @Column({nullable: true})
    refreshToken: string

    @Column({nullable: true})
    imageurl: string

    @OneToMany(() => Product, product => product.user , {cascade: true,eager: true})
    products: Product[]

    @OneToOne(() => Profile, profile => profile.user , {cascade: true,eager: true})
    profile: Profile

    @Column({type: "enum",enum: Role,default: Role.User})
    role?: Role

    
}