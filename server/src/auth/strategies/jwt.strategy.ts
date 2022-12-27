import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'BABB4D946BD7D54D',
    });
  }

  validate(payload: any) {
    console.log('payload', payload);

    return { email: payload.email, sub: payload.id };
  }
}
