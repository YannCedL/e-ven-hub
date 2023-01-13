import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { OrganisateurService } from './organisateur.service';
import { CreateOrganisateurDto } from './dto/create-organisateur.dto';
import { UpdateOrganisateurDto } from './dto/update-organisateur.dto';

@Controller('organisateur')
export class OrganisateurController {
  constructor(private readonly organisateurService: OrganisateurService) { }

  @Post()
  create(@Body() createOrganisateurDto: CreateOrganisateurDto) {
    return this.organisateurService.create(createOrganisateurDto);
  }

  @Get()
  findAll() {
    return this.organisateurService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organisateurService.findOne('' + id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrganisateurDto: UpdateOrganisateurDto) {
    return this.organisateurService.update(id, updateOrganisateurDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.organisateurService.remove(id);
  }
}
