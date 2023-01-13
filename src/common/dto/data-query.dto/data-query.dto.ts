import { IsNumber, IsPositive } from "class-validator";

export class DataQueryDto {
    @IsNumber()
    @IsPositive()
    user: number;

    @IsNumber()
    @IsPositive()
    event: number;

}
