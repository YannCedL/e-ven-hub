import { IsNumber, IsString } from "class-validator";

export class CreateUserDto {

    @IsString()
    readonly lastName: string;

    @IsString()
    readonly firstName: string;

    @IsString()
    readonly mail: string;

    @IsString()
    readonly pass: string;

    @IsNumber()
    readonly phone: string;

}
