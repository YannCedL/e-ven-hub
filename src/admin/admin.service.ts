import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Repository } from 'typeorm';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,

    private readonly connection: Connection,
  ) { }

  create(createAdminDto: CreateAdminDto) {
    const admin = this.adminRepository.create(createAdminDto);
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
}
