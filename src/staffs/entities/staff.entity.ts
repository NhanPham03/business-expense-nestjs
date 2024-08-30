import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

export enum Roles {
  Claimer = "claimer",
  Approver = "approver",
  Finance = "finance",
  Admin = "admin",
}

@Entity("staffs")
export class Staff {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  department: string;

  @Column()
  job_title: string;

  @Column()
  rank: string;

  @Column({ type: "enum", enum: Roles })
  role: Roles;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  active: boolean;

  @Column({ type: "date" })
  created_at: string;

  @Column({ type: "date" })
  updated_at: string;
}
