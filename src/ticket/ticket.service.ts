import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataQueryDto } from 'src/common/dto/data-query.dto/data-query.dto';
import { Event } from 'src/event/entities/event.entity';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Ticket } from './entities/ticket.entity';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,

    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) { }

  async create(createTicketDto: CreateTicketDto) {
    const Event = await this.preloadEventById(createTicketDto.EventId)
    if (Event) {
      const ticket = this.ticketRepository.create({
        ...createTicketDto,
        Event

      });
      return this.ticketRepository.save(ticket);
    }
  }

  findAll() {

    return this.ticketRepository.find({
      relations: ['Event', 'Users']
    });

  }

  async findOne(id: string) {
    const ticket = await this.ticketRepository.findOne({
      where: { Id: parseInt(id) },
      relations: ['Event', 'Users']
    });
    if (!ticket) {
      throw new NotFoundException(`ticket #${id}`)
    }
    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.ticketRepository.preload({
      Id: +id,
      ...updateTicketDto,
    });
    if (!ticket) {
      throw new NotFoundException(`Ticket #${id} not found`)
    }
    return this.ticketRepository.save(ticket)
  }

  async remove(id: string) {
    const ticket = await this.findOne(id);
    return this.ticketRepository.remove(ticket)
  }

  async buyTicket(data: DataQueryDto) {
    const { event, user } = data
    const ticket = await this.preloadTicketBuy(event)
    const Users = await this.preloadUserById(user)
    if (ticket && Users) {
      const buy = this.ticketRepository.update(
        ticket.Id,
        {
          ...UpdateTicketDto,
          Users
        })
      return buy
    }


    return test
  }

  private async preloadEventById(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { Id: id }
    })
    if (!event) {
      throw new NotFoundException(`Event #${id} not found`)
    }
    return event
  }

  private async preloadTicketBuy(event: number): Promise<Ticket> {
    const waiting = await this.ticketRepository.find({
      relations: ['Event', 'Users']
    })

    let result = []
    waiting.forEach(i => {
      if (i.Users == null && i.Event.Id == event) {
        result.push(i)
      }
    });
    if (result[0] == null) {
      throw new NotFoundException(`Sorry all Tickets are buyed or the Event is unavailable`)
    }
    return result[0]
  }

  private async preloadUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { Id: id }
    })
    if (!user) {
      throw new NotFoundException(`User #${id} not found`)
    }
    return user
  }
}
