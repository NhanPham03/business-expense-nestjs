import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { StaffsService } from 'src/staffs/staffs.service';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private staffsService: StaffsService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // jwtFromRequest: (req: Request) => {
      //   if (req && req.cookies) {
      //     return req.cookies["accessToken"];
      //   }
      //   return null;
      // },
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
      department: payload.department, 
      role: payload.role, 
    };
  }
}
