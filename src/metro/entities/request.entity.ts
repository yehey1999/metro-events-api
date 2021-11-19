import { Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { Event } from "./event.entity";

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    details: string;

    @Column()
    type: string;

    @Column({ default: 'reviewing' })
    status: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.sentRequests)
    sender: User;

    @ManyToOne(() => Event, event => event.requests)
    event: Event;

}