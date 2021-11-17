import { Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn, OneToMany, ManyToOne, OneToOne } from "typeorm";
import { Event } from "./event.entity";
import { Request } from "./request.entity";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => Request, request => request.notification)
    request: Request;

    @Column()
    description: string;

    @ManyToOne(() => Event, event => event.notifications)
    event: Event;
}