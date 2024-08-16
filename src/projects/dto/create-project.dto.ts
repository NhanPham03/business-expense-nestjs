import { IsArray, IsDateString, IsNotEmpty, IsObject, IsString } from "class-validator";
import { CreateStaffDto } from "src/staffs/dto/create-staff.dto";

class StaffSubsetDto {
  @IsString()
  name: string;
}

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  code: string;

  @IsDateString()
  @IsNotEmpty()
  from: string;

  @IsDateString()
  @IsNotEmpty()
  to: string;

  @IsObject()
  @IsNotEmpty()
  project_manager: CreateStaffDto;

  @IsObject()
  @IsNotEmpty()
  quality_assurance: CreateStaffDto;

  @IsArray()
  @IsNotEmpty()
  technical_lead: CreateStaffDto[];

  @IsArray()
  @IsNotEmpty()
  business_analyst: CreateStaffDto[];

  @IsArray()
  @IsNotEmpty()
  developers: CreateStaffDto[];

  @IsArray()
  @IsNotEmpty()
  testers: CreateStaffDto[];

  @IsArray()
  @IsNotEmpty()
  technical_consultant: CreateStaffDto[];
}
