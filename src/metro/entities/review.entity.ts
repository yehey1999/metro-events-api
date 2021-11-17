import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.entity';
import { Event } from "./event.entity";

@Entity()
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;

    @Column()
    user: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Event, event => event.reviews)
    event: Event;
}