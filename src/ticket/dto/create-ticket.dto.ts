import { IsNumber, IsString } from "class-validator";

export class CreateTicketDto {
    @IsNumber()
    readonly eventId: number;

}
