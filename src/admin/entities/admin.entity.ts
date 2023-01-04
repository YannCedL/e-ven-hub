import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Admin {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    lastName: string;

    @Column()
    firstName: string;

    @Column()
    mail: string;

    @Column()
    pass: string;

    @Column()
    telephone: string;


}
