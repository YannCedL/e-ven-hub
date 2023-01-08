import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    lastName: string;

    @IsString()
    firstName: string;

    @IsString()
    mail: string;

    @IsString()
    pass: string;

    @IsNumber()
    phone: number;

    @IsString()
    actif: string;
}
