import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';
import { MoviesModule } from './movies/movies.module';
import { ConfigModule } from '@nestjs/config';
import { Movie } from './movies/entities/movie.entity';
import { MailModule } from './mail/mail.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    MoviesModule,
    MailerModule.forRoot({
      // get email host, port, user, pass from .env file
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      options: {
        secure: false,
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: __dirname + '/templates',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'movify.sqlite',
      entities: [User, Movie],
    }),
    MailModule,
  ],
  controllers: [AppController],

  providers: [AppService],
})
export class AppModule {}
