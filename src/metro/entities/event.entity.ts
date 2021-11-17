import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.entity';

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    startDatetime: string;

    @Column()
    endDatetime: string;

    @Column({ default: 'ongoing' })
    status: string;

    @ManyToOne(() => User, user => user.createdEvents)
    createdBy: User;

    @ManyToMany(() => User, user => user.events)
    @JoinTable()
    participants: User[];   
}