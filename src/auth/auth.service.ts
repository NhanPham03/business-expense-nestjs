import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { Request } from 'express';
import { StaffsService } from 'src/staffs/staffs.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly staffsService: StaffsService,
    private readonly jwtService: JwtService,
  ) {}

  async validateStaff(email: string, password: string): Promise<any> {
    const staff = await this.staffsService.findOneByEmail(email);
    
    if (staff && compare(password, staff.password)) {
      const { password, ...data } = staff;
      return data;
    }
    return null;
  }

  async login(staff: any) {
    const payload = { 
      sub: staff._id, 
      name: staff.name,
      department: staff.department, 
      role: staff.role, 
    };

    return {
      accessToken: this.jwtService.sign(payload, { expiresIn: '1d' }),
      user: {
        id: staff._id,
        name: staff.name,
        department: staff.department,
        role: staff.role,
      }
    }
  }
}
