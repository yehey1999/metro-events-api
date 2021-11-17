import { Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn, OneToMany, ManyToOne, CreateDateColumn, UpdateDateColumn, OneToOne } from "typeorm";
import { User } from "./user.entity";
import { Notification } from "./notification.entity";

@Entity()
export class Request {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    details: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User, user => user.sentRequests)
    sender: User;

    @OneToOne(() => Notification, notification => notification.request)
    notification: Notification;
}