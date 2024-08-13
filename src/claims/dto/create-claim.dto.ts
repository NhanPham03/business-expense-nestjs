import { CreateProjectDto } from "src/projects/dto/create-project.dto";
import { CreateStaffDto } from "src/staffs/dto/create-staff.dto";

export class CreateClaimDto {
  status: string;
  staff: CreateStaffDto;
  project: CreateProjectDto;
  
  remarks: string;
  created_at: string;
  updated_at: string;
}
