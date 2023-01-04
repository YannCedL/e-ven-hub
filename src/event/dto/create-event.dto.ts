import { IsNotEmpty, IsString, IsNumber } from 'class-validator'

export class CreateEventDto {
    @IsString()
    readonly title: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly date: string;

    @IsString()
    readonly statut: string;

    //Organisation
    @IsNotEmpty()
    @IsNumber()
    organisateurId: number;

    @IsNumber()
    userId: number;

}
