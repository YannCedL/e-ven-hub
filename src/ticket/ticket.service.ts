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
    const Event = await this.preloadEventById(createTicketDto.eventId)
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

  async findEventbyUser(body: DataQueryDto) {
    const { user } = body
    var ticket1 = []
    var ticket = []
    const wait = this.findAll();
    (await wait).map(tick => {
      if (tick.Users) {
        if (tick.Users.id == user)
          ticket1.push(tick.Event)
      }
    })
    var cache = {};
    ticket = ticket1.filter(function (elem, index, array) {
      return cache[elem.id] ? 0 : cache[elem.id] = 1;
    });
    return ticket
  }


  async findOne(id: string) {
    const ticket = await this.ticketRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['Event', 'Users']
    });
    if (!ticket) {
      throw new NotFoundException(`ticket #${id}`)
    }
    return ticket;
  }

  async update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticket = await this.ticketRepository.preload({
      id: +id,
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
      this.ticketRepository.update(
        ticket.id,
        {
          ...UpdateTicketDto,
          Users
        })
    }


    return `Thanks to buy the ticket ${ticket} . See you at the event`
  }

  async allUsersByEvent(body: DataQueryDto) {
    const { event } = body
    const waiting = await this.ticketRepository.find({
      relations: ['Event', 'Users']
    })

    let result = []
    waiting.forEach(i => {
      if (i.Users != null && i.Event.id == event) {
        result.push(i.Users)
      }
    });
    if (result == null) {
      throw new NotFoundException(`Sorry you haven't a ticket buyed`)
    }
    return result
  }

  private async preloadEventById(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({
      where: { id: id }
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
      if (i.Users == null && i.Event.id == event) {
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
      where: { id: id }
    })
    if (!user) {
      throw new NotFoundException(`User #${id} not found`)
    }
    return user
  }


}
