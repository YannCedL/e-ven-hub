import { IsString, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class DataQueryDto {
    @IsNumber()
    @IsPositive()
    user: number;

    @IsNumber()
    @IsPositive()
    event: number;

    @IsString()
    @IsNotEmpty()
    Mail: string;


    @IsString()
    @IsNotEmpty()

    Pass: string;

}
