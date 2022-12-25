import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    JwtModule.register({
      secret: 'secret',
      signOptions: { expiresIn: '10h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UsersService, JwtStrategy],
})
export class AuthModule {}
