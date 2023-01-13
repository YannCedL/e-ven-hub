import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator'

export class CreateEventDto {
    @IsString()
    readonly title: string;

    @IsString()
    readonly description: string;

    @IsString()
    readonly date: string;

    @IsString()
    readonly statut: string;

    @IsBoolean()
    readonly actif: boolean;

    @IsNumber()
    readonly prix: number;

    //Organisation
    @IsNotEmpty()
    @IsNumber()
    organisateurId: number;

    @IsNumber()
    userId: number;

}
