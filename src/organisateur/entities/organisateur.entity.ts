import { Event } from "src/event/entities/event.entity";
import { Column, Entity, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Organisateur {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        unique: true
    })
    name: string;

    @Column()
    mail: string;

    @Column()
    pass: string;

    @Column()
    tel: number;

    @Column()
    adresse: string;

    @Column()
    gerant: string;

    @Column()
    num_RCS: string;

    @JoinTable()
    @OneToMany(type => Event, event => event.Organisateur)
    Events: Event[]
}
