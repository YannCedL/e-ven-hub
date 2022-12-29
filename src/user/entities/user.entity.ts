import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "src/event/entities/event.entity";
import { Ticket } from "src/ticket/entities/ticket.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Nom: string;

    @Column()
    Prenom: string;

    @Column()
    Mail: string;

    @Column()
    Pass: string;

    @Column()
    Telephone: number;

    @JoinTable()
    @OneToMany(type => Ticket, ticket => ticket.Users)
    Tickets: Ticket[];
}
