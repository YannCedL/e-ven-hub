import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataQueryDto } from 'src/common/dto/data-query.dto/data-query.dto';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { /*Connection,*/ Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
    /*
        private readonly connection: Connection,
    */

  ) { }

  async create(createUserDto: CreateUserDto) {
    const { pass } = createUserDto;
    const hash = await bcrypt.hash(pass, 10);
    const user = this.userRepository.create({ ...createUserDto, pass: hash });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find({
      relations: ['Tickets'],
    });
  }

  async findOne(id: string) {
    const user = await this.userRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['Tickets'],
    });
    if (!user) {
      throw new NotFoundException(`user #${id}`)
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const { pass } = updateUserDto;
    const hash = await bcrypt.hash(pass, 10);
    const user = await this.userRepository.preload({
      id: +id,
      ...updateUserDto,
      pass: hash
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

  async login(body: DataQueryDto): Promise<User | undefined> {
    const { Mail } = body
    const user = await this.userRepository.findOne({
      where: { mail: Mail }
    });

    if (user) {
      return Promise.resolve(user)
    }
    return undefined
  }
  /*
    async recommmendUser(user: User) {
      const queryRunner = this.connection.createQueryRunner();
  
      await queryRunner.connect();
      await queryRunner.startTransaction();
      try {
        queryRunner.manager.save(user);
      }
      catch (err) {
        await queryRunner.rollbackTransaction();
      }
      finally {
        await queryRunner.release()
      }
    }*/
}
