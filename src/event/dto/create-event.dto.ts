import { IsNotEmpty, IsDate, IsString, IsNumber } from 'class-validator'

export class CreateEventDto {
    @IsString()
    readonly Title: string;

    @IsString()
    readonly Description: string;

    @IsString()
    readonly Date: string;

    @IsString()
    readonly statut: string;

    //Organisation
    @IsNumber()
    organisateurId: number;

    @IsNumber()
    UserId: number;

}
