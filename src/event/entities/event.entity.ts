import { Organisateur } from "src/organisateur/entities/organisateur.entity";
import { Ticket } from "src/ticket/entities/ticket.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    date: string;

    @Column()
    statut: string;

    @Column()
    actif: boolean;

    @Column()
    prix: number;




    @ManyToOne(type => Organisateur, organisation => organisation.Events, { cascade: true, })
    Organisateur: Organisateur;

    @JoinTable()
    @OneToMany(type => Ticket, ticket => ticket.Event)
    tickets: Ticket[];


}
