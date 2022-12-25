import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/entity/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string): Promise<User> {
    const saltOrRounds = 10;
    const hashedPassword = await hash(password, saltOrRounds);

    return this.usersService.create(email, hashedPassword);
  }

  async login(email: string, password: string) {
    const user = await this.usersService.findByEmail(email);

    if (!user) {
      return undefined;
    }
    const isMatched = await compare(password, user.password);

    if (!isMatched) {
      return undefined;
    }

    const token = this.signJWT(user);
    return token;
  }

  private async signJWT(user: User) {
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }
}
