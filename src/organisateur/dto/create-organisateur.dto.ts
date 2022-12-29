import { IsNumber, IsOptional, IsString } from "class-validator";


export class CreateOrganisateurDto {
    @IsString()
    Nom: string;

    @IsString()
    Mail: string;

    @IsString()
    Pass: string;

    @IsNumber()
    Tel: number;

    @IsString()
    Adresse: string;

    @IsString()
    Gerant: string;

    @IsOptional()
    Num_RCS: string;
}
