import { Column, ObjectId, ObjectIdColumn } from "typeorm";

export class StaffDTO {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  department: string;
}