import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Request } from '@nestjs/common/decorators';
import { request } from 'http';
import { DataQueryDto } from 'src/common/dto/data-query.dto/data-query.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) { }

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }
  @Get('/organisateur')
  findAllMile(@Body() body: DataQueryDto) {
    return this.eventService.findAllMine(body)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.eventService.findOne('' + id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEventDto: UpdateEventDto) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}
