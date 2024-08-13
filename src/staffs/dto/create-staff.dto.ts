import { Roles } from "../entities/staff.entity";

export class CreateStaffDto {
  name: string;
  department: string;
  rank: string;
  role: Roles;
  email: string;
  password: string;
  active: boolean;
}
