import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    Nom: string;

    @IsString()
    Prenom: string;

    @IsString()
    Mail: string;

    @IsString()
    Pass: string;

    @IsNumber()
    Telephone: number;
}
