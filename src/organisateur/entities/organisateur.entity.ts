import { Event } from "src/event/entities/event.entity";
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organisateur {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column({
        unique: true
    })
    Nom: string;

    @Column()
    Mail: string;

    @Column()
    Pass: string;

    @Column()
    Tel: number;

    @Column()
    Adresse: string;

    @Column()
    Gerant: string;

    @Column()
    Num_RCS: string;

    @JoinTable()
    @OneToMany(type => Event, event => event.Organisateur)
    Events: Event[]
}
