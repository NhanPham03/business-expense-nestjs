import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Roles } from "../entities/staff.entity";
import { Transform } from "class-transformer";

export class CreateStaffDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @Transform(({ value }) => value ?? "Temporary")
  department?: string;

  @IsString()
  @Transform(({ value }) => value ?? "Unknown")
  job_title?: string;

  @IsString()
  @Transform(({ value }) => value ?? "N/A")
  rank?: string;

  @IsEnum(Roles)
  @Transform(({ value }) => value ?? Roles.Claimer)
  role: Roles;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
