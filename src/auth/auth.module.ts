import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport/dist/passport.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organisateur } from 'src/organisateur/entities/organisateur.entity';
import { OrganisateurModule } from 'src/organisateur/organisateur.module';
import { OrganisateurService } from 'src/organisateur/organisateur.service';
import { Ticket } from 'src/ticket/entities/ticket.entity';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [TypeOrmModule.forFeature([User, Ticket, Organisateur]), PassportModule, JwtModule.register({
    secret: process.env.SECRETKEY,
    signOptions: { expiresIn: '24h' },
  }),],
  controllers: [AuthController],
  providers: [AuthService, OrganisateurService, UserService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule { }
