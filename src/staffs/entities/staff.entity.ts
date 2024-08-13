import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

export enum Roles {
  CLAIMER = "claimer",
  APPROVER = "approver",
  FINANCE = "finance",
  ADMIN = "admin",
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
  rank: string;

  @Column({ type: "enum", enum: Roles })
  private _role: Roles;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  active: boolean;

  @Column({ type: "date" })
  created_at: string;

  @Column({ type: "date" })
  updated_at: string;

  get role(): string {
    return this._role.charAt(0).toUpperCase() + this._role.slice(1);
  }

  set role(value: Roles) {
    this._role = value.toLowerCase() as Roles;
  }
}
