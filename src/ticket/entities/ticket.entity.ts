
import { Event } from "src/event/entities/event.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(type => Event, event => event.tickets, { cascade: true })
    Event: Event;

    @ManyToOne((type) => User, (user) => user.Tickets)
    Users: User;

}
