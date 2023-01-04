import { IsNumber, IsString } from "class-validator";

export class CreateTicketDto {

    @IsNumber()
    readonly prix: number;

    @IsNumber()
    eventId: number;

}
