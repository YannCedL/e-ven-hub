import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity'
import { NotFoundException } from '@nestjs/common/exceptions';
import { Organisateur } from 'src/organisateur/entities/organisateur.entity';

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

  }

  findAll() {
    return this.eventRepository.find({
      relations: ['Organisateur', 'tickets']
    });
  }

  async findAllMine(id: number) {
    const organ = await this.preloadOrganById(id)
    const event = await this.eventRepository.findOne({
      where: { Organisateur: organ },
      relations: ['Organisateur', 'tickets']
    });
    if (!event) {
      throw new NotFoundException(`Event #${id}`)
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
    const event = await this.eventRepository.preload({
      id: +id,
      ...updateEventDto,
    });
    if (!event) {
      throw new NotFoundException(`Event #${id} not found`)
    }
    return this.eventRepository.save(event)
  }

  async remove(id: string) {
    const event = await this.findOne(id);
    return this.eventRepository.remove(event)
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
