import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "src/event/entities/event.entity";
import { Ticket } from "src/ticket/entities/ticket.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lastName: string;

    @Column()
    firstName: string;

    @Column({ unique: true })
    mail: string;

    @Column()
    pass: string;

    @Column()
    phone: number;

    @Column()
    actif: string;

    @JoinTable()
    @OneToMany(type => Ticket, ticket => ticket.Users)
    Tickets: Ticket[];
}
