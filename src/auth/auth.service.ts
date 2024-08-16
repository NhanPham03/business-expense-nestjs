import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { StaffsService } from 'src/staffs/staffs.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly staffsService: StaffsService,
    private jwtService: JwtService,
  ) {}

  async validateStaff(email: string, password: string): Promise<any> {
    const staff = await this.staffsService.findOneByEmail(email);
    
    if (staff && staff.password === password) {
      const { password, ...data } = staff;
      return data;
    }
    return null;
  }

  async login(staff: any) {
    const payload = { 
      sub: staff._id, 
      name: staff.name, 
      role: staff.role, 
    };

    return {
      accessToken: this.jwtService.sign(payload),
    }
  }
}
