import { IsNumber, IsString } from "class-validator";

export class CreateTicketDto {



    @IsNumber()
    eventId: number;

}
