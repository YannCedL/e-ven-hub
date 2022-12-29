import { Organisateur } from "src/organisateur/entities/organisateur.entity";
import { Ticket } from "src/ticket/entities/ticket.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Title: string;

    @Column()
    Description: string;

    @Column()
    Date: string;

    @Column()
    statut: string;




    @ManyToOne(type => Organisateur, organisation => organisation.Events, { cascade: true, })
    Organisateur: Organisateur;

    @JoinTable()
    @OneToMany(type => Ticket, ticket => ticket.Event)
    tickets: Ticket[];


}
