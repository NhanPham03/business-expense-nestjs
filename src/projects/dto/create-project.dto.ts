import { CreateStaffDto } from "src/staffs/dto/create-staff.dto";

export class CreateProjectDto {
  name: string;
  code: string;
  from: string;
  to: string;
  project_manager: CreateStaffDto;
  quality_assurance: CreateStaffDto;
  technical_lead: CreateStaffDto[];
  business_analyst: CreateStaffDto[];
  developers: CreateStaffDto[];
  testers: CreateStaffDto[];
  technical_consultant: CreateStaffDto[];
}
