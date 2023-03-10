import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { DataQueryDto } from 'src/common/dto/data-query.dto/data-query.dto';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) { }

  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @Post('/user')
  findAllUsers(@Body() body: DataQueryDto) {
    return this.ticketService.findEventbyUser(body)
  }

  @Post('/event')
  findAllUserByEvent(@Body() body: DataQueryDto) {
    return this.ticketService.allUsersByEvent(body)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne('' + id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(id);
  }


  @Post('/buy')
  buyTicket(@Body() data: DataQueryDto) {
    return this.ticketService.buyTicket(data)
  }
}
