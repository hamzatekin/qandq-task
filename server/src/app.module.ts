import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entity/user.entity';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'movify.sqlite',
      entities: [User],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
