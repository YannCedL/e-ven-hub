import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { Event } from './entities/event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organisateur } from 'src/organisateur/entities/organisateur.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Organisateur, Ticket])],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule { }
