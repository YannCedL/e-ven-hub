import { IsNumber, IsString } from "class-validator";

export class CreateTicketDto {

    @IsNumber()
    readonly Prix: number;

    @IsNumber()
    EventId: number;

}
