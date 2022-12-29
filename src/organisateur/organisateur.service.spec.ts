import { Test, TestingModule } from '@nestjs/testing';
import { OrganisateurService } from './organisateur.service';

describe('OrganisateurService', () => {
  let service: OrganisateurService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrganisateurService],
    }).compile();

    service = module.get<OrganisateurService>(OrganisateurService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
