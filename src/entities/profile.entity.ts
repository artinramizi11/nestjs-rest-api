import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn()
    id: number 

    @Column()
    address: string 

    @Column()
    city: string 

    @Column()
    country: string 

    @Column()
    gender: string

    @OneToOne(() => User, user => user.profile , {onDelete:"CASCADE"})
    @JoinColumn()
    user: User


}