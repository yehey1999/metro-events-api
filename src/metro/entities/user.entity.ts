import { Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Event } from './event.entity';
import { Request } from './request.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({ default: 'regular' })
    type: string;

    @Column({ nullable: true })
    grantedAt: string;

    @OneToMany(() => Event, event => event.createdBy)
    createdEvents: Event[];

    @ManyToMany(() => Event, event => event.participants)
    events: Event[];

    @OneToMany(() => Request, request => request.sender)
    sentRequests: Request[];
}