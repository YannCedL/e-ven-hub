import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Event } from './event/entities/event.entity';
import { EventModule } from './event/event.module';
import { Ticket } from './ticket/entities/ticket.entity';
import { User } from './user/entities/user.entity';
import { OrganisateurModule } from './organisateur/organisateur.module';
import { AdminModule } from './admin/admin.module';
import { Organisateur } from './organisateur/entities/organisateur.entity';
import { Admin } from './admin/entities/admin.entity';
import { UserModule } from './user/user.module';
import { TicketModule } from './ticket/ticket.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [EventModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'user',
      password: 'passwrd',
      database: 'event-hub',
      entities: [Event, User, Ticket, Organisateur, Admin],
      autoLoadEntities: true,
      synchronize: true,
    }),
    OrganisateurModule,
    AdminModule,
    UserModule,
    TicketModule,
    ConfigModule.forRoot(),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
