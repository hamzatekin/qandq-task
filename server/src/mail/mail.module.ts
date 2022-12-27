import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailController } from './mail.controller';
import { UsersModule } from '../users/users.module';
import { UsersService } from '../users/users.service';
import { MoviesService } from '../movies/movies.service';
import { MoviesModule } from '../movies/movies.module';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [UsersModule, MoviesModule],
  controllers: [MailController],
  providers: [MailService, UsersService, MoviesService],
})
export class MailModule {}
