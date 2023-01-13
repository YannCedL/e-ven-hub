import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>

  ) { }

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      relations: ['Tickets'],
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { Id: parseInt(id) },
      relations: ['Tickets'],
    });
    if (!user) {
      throw new NotFoundException(`user #${id}`)
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      Id: +id,
      ...updateUserDto,
    });
    if (!user) {
      throw new NotFoundException(`user #${id} not found`)
    }
    return this.userRepository.save(user)
  }

  async remove(id: string) {
    const user = await this.findOne(id);
    return this.userRepository.remove(user)
  }
}
