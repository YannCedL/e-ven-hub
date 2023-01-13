import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    Id: number;

    @Column()
    Name: string;

    @Column()
    Prenom: string;

    @Column()
    Mail: string;

    @Column()
    Pass: string;

    @Column()
    Telephone: string;


}
