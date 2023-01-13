import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataQueryDto } from 'src/common/dto/data-query.dto/data-query.dto';
import { Organisateur } from 'src/organisateur/entities/organisateur.entity';
import { Connection, Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    private readonly connection: Connection,
  ) { }

  async create(createAdminDto: CreateAdminDto) {
    const { pass } = createAdminDto;
    const hash = await bcrypt.hash(pass, 10);
    const admin = this.adminRepository.create({ ...createAdminDto, pass: hash });
    return this.adminRepository.save(admin);
  }

  findAll() {
    return this.adminRepository.find();
  }

  async findOne(id: string) {
    const admin = await this.adminRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!admin) {
      throw new NotFoundException(`admin #${id}`)
    }
    return admin;
  }


  async resetPassword(updateadminDto: UpdateAdminDto) {
    const { pass, mail } = updateadminDto
    if (mail) {

      const user = await this.adminRepository.findOne({
        where: { mail: mail }
      })
      if (user) {
        const hash = await bcrypt.hash(pass, 10);
        user.pass = hash
        return this.adminRepository.save(user)
      }
      else throw new NotFoundException(`user #${mail} not found`)
    }
    else throw new NotFoundException(` #${mail} not found`)


  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepository.preload({
      id: +id,
      ...updateAdminDto,
    });
    if (!admin) {
      throw new NotFoundException(`admin #${id} not found`)
    }
    return this.adminRepository.save(admin)
  }

  async remove(id: string) {
    const admin = await this.findOne(id);
    return this.adminRepository.remove(admin)
  }

  async login(body: DataQueryDto): Promise<Admin | undefined> {
    const { Mail } = body
    const admin = await this.adminRepository.findOne({
      where: { mail: Mail }
    });

    if (admin) {
      return Promise.resolve(admin)
    }
    return undefined
  }
}
