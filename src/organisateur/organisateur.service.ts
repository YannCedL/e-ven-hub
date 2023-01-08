import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataQueryDto } from 'src/common/dto/data-query.dto/data-query.dto';
import { Repository } from 'typeorm';
import { CreateOrganisateurDto } from './dto/create-organisateur.dto';
import { UpdateOrganisateurDto } from './dto/update-organisateur.dto';
import { Organisateur } from './entities/organisateur.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OrganisateurService {

  constructor(
    @InjectRepository(Organisateur)
    private readonly organRepository: Repository<Organisateur>,
  ) { }

  async create(createOrganisateurDto: CreateOrganisateurDto) {
    const { pass } = createOrganisateurDto;

    if (pass) {
      const hash = await bcrypt.hash(pass, 10);
      const organ = this.organRepository.create({ ...createOrganisateurDto, pass: hash, actif: "actif" });
      return this.organRepository.save(organ);
    }

    if (!pass) {
      const organ = this.organRepository.create({
        ...createOrganisateurDto,
        actif: "actif"
      });
      return this.organRepository.save(organ);
    }
  }

  findAll() {
    return this.organRepository.find({
      relations: ['Events']
    });
  }

  async findOne(id: string) {
    const organ = await this.organRepository.findOne({
      where: { id: parseInt(id) },
      relations: ['Events']
    });
    if (!organ) {
      throw new NotFoundException(`organisation #${id}`)
    }
    return organ;
  }

  async update(id: string, updateOrganisateurDto: UpdateOrganisateurDto) {
    const { pass } = updateOrganisateurDto;
    const hash = await bcrypt.hash(pass, 10);
    const organ = await this.organRepository.preload({
      id: +id,
      ...updateOrganisateurDto,
      pass: hash
    });
    if (!organ) {
      throw new NotFoundException(`organ #${id} not found`)
    }
    return this.organRepository.save(organ)
  }

  async remove(id: string) {
    const org = await this.findOne(id);
    const act = org.actif == "inactif" ? "actif" : "inactif"
    const organ = await this.organRepository.preload({
      id: +id,
      ...org,
      actif: act
    });
    return this.organRepository.save(organ)
  }

  async login(body: DataQueryDto): Promise<Organisateur | undefined> {
    const { Mail } = body
    const organ = await this.organRepository.findOne({
      where: { mail: Mail }
    });

    if (organ) {
      return Promise.resolve(organ)
    }
    return undefined
  }
}
