import { OmitType } from "@nestjs/mapped-types";
import { CreateStaffDto } from "./create-staff.dto";
import { IsDateString, IsMongoId } from "class-validator";

export class RetrieveStaffDto extends OmitType(CreateStaffDto, ["password"] as const) {
  @IsDateString()
  created_at: string;

  @IsDateString()
  updated_at: string;
}
