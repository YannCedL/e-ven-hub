import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity'
import { NotFoundException } from '@nestjs/common/exceptions';
import { Organisateur } from 'src/organisateur/entities/organisateur.entity';
import { DataQueryDto } from 'src/common/dto/data-query.dto/data-query.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    @InjectRepository(Organisateur)
    private readonly organRepository: Repository<Organisateur>,
  ) { }

  async create(createEventDto: CreateEventDto) {
    const Organisateur = await this.preloadOrganById(createEventDto.organisateurId)

    if (Organisateur) {
      const event = this.eventRepository.create({
        ...createEventDto,
        Organisateur
      });
      return this.eventRepository.save(event);

    }
    else {
      throw new NotFoundException('Sorry you can not creat a event if you are not au Organisateur')
    }

  }

  findAll() {
    return this.eventRepository.find({
      relations: ['Organisateur', 'tickets']
    });
  }

  async findAllMine(body: DataQueryDto) {
    const { organisateur } = body;
    const organ = await this.preloadOrganById(organisateur)
    const event = await this.eventRepository.find({
      where: { Organisateur: organ },
      relations: ['Organisateur', 'tickets']
    });
    if (!event) {
      throw new NotFoundException(`Organisateur #${organisateur}`)
    }
    return event;
  }

  async findOne(id: string) {
    const event = await this.eventRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['Organisateur', 'tickets']
    });
    if (!event) {
      throw new NotFoundException(`Event #${id}`)
    }
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const Event = await this.findOne(id)
    const tickets = Event.tickets.map(ticket => { if (ticket.Users != null) { return false } })
    if (tickets) {
      const event = await this.eventRepository.preload({
        id: +id,
        ...updateEventDto,
      });
      if (!event) {
        throw new NotFoundException(`Event #${id} not found`)
      }
      return this.eventRepository.save(event)
    }
    else {
      throw new NotFoundException(`Sorry you can't update event ${Event.title} beacause a user buy a ticket`)
    }
  }

  async remove(id: string) {
    const event = await this.findOne(id);
    if (event) {
      const remEvent = !event.actif
      const Event = await this.eventRepository.preload({
        id: +id,
        ...event,
        actif: remEvent
      })
      return this.eventRepository.save(Event)
    }
    else {
      throw new NotFoundException(`Event #${id} not found`)

    }
  }

  async findAllEventByUser(body: DataQueryDto) {
    const { user } = body;
    var table = []
    const events = await this.eventRepository.find({
      relations: ['tickets']
    })
    if (events) {
      events.map(event => event.tickets.map(ticket => {

        if (ticket.Users != null) {
          table.push(event.id)
        }

      }
      ))
    }
    return table

  }

  private async preloadOrganById(id: number): Promise<Organisateur> {
    if (id) {

      const organ = await this.organRepository.findOne({
        where: { id: id }
      })
      if (!organ) {
        throw new NotFoundException(`Organisateur #${id} not found`)
      }
      return organ
    }
    else
      return null
  }
}
