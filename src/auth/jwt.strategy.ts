import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { StaffsService } from 'src/staffs/staffs.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private staffsService: StaffsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const staff = await this.staffsService.findOneById(payload.sub);
    if (!staff || !staff.active) {
      throw new UnauthorizedException();
    }

    return { 
      _id: payload.sub, 
      name: payload.name, 
      role: payload.role, 
    };
  }
}
