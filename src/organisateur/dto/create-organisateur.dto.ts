import { IsNumber, IsOptional, IsString } from "class-validator";


export class CreateOrganisateurDto {
    @IsString()
    name: string;

    @IsString()
    mail: string;

    @IsString()
    pass: string;

    @IsNumber()
    tel: number;

    @IsString()
    adresse: string;

    @IsString()
    gerant: string;

    @IsOptional()
    num_RCS: string;
}
