import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganisateurDto } from './dto/create-organisateur.dto';
import { UpdateOrganisateurDto } from './dto/update-organisateur.dto';
import { Organisateur } from './entities/organisateur.entity';

@Injectable()
export class OrganisateurService {

  constructor(
    @InjectRepository(Organisateur)
    private readonly organRepository: Repository<Organisateur>,
  ) { }

  create(createOrganisateurDto: CreateOrganisateurDto) {
    const organ = this.organRepository.create(createOrganisateurDto);
    return this.organRepository.save(organ);
  }

  findAll() {
    return this.organRepository.find({
      relations: ['Events']
    });
  }

  async findOne(id: string) {
    const organ = await this.organRepository.findOne({
      where: { Id: parseInt(id) },
      relations: ['Events']
    });
    if (!organ) {
      throw new NotFoundException(`organisation #${id}`)
    }
    return organ;
  }

  async update(id: string, updateOrganisateurDto: UpdateOrganisateurDto) {
    const organ = await this.organRepository.preload({
      Id: +id,
      ...updateOrganisateurDto,
    });
    if (!organ) {
      throw new NotFoundException(`organ #${id} not found`)
    }
    return this.organRepository.save(organ)
  }

  async remove(id: string) {
    const organ = await this.findOne(id);
    return this.organRepository.remove(organ)
  }
}
