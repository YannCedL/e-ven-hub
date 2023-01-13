import { Test, TestingModule } from '@nestjs/testing';
import { OrganisateurController } from './organisateur.controller';
import { OrganisateurService } from './organisateur.service';

describe('OrganisateurController', () => {
  let controller: OrganisateurController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganisateurController],
      providers: [OrganisateurService],
    }).compile();

    controller = module.get<OrganisateurController>(OrganisateurController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
