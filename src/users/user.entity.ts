import { Column, Entity,JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import {Exclude} from "class-transformer";

@Entity()
class User {
    @PrimaryGeneratedColumn()
    public id?: number;

    @Column({ unique: true })
    public email: string;

    @Column()
    public name: string;

    @Column()
    public password: string;

    @Column({
        nullable: true
    })
    @Exclude()
    public currentHashedRefreshToken?: string;
}

export default User;