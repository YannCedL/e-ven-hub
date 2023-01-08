import { IsNumber, IsOptional, IsString } from "class-validator";


export class CreateOrganisateurDto {
    @IsString()
    readonly name: string;

    @IsString()
    readonly mail: string;

    @IsString()
    readonly pass: string;

    @IsNumber()
    readonly tel: string;

    @IsString()
    readonly adresse: string;

    @IsString()
    readonly gerant: string;

    @IsOptional()
    readonly num_RCS: string;

}
