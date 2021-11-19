import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from './user.entity';
import { Review } from "./review.entity";
import { Request } from "./request.entity";

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

    @Column()
    address: string;

    @ManyToOne(() => User, user => user.createdEvents)
    createdBy: User;

    @ManyToMany(() => User, user => user.events, { cascade: true })
    @JoinTable()
    participants: User[];   

    @OneToMany(() => Request, request => request.event)
    requests: Request[];

    @OneToMany(() => Review, review => review.event)
    reviews: Review[];

    @CreateDateColumn()
    createdAt: Date;

}