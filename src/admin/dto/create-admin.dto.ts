import { IsString } from "class-validator";

export class CreateAdminDto {
    @IsString()
    readonly lastName: string;

    @IsString()
    readonly firstName: string;

    @IsString()
    readonly mail: string;

    @IsString()
    readonly pass: string;

    @IsString()
    readonly telephone: string;
}
