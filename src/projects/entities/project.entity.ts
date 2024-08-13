import { Staff } from "src/staffs/entities/staff.entity";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity("projects")
export class Project {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column({ type: "date" })
  from: string;

  @Column({ type: "date" })
  to: string;

  @Column((type) => Staff)
  project_manager: Staff;

  @Column((type) => Staff)
  quality_assurance: Staff;

  @Column((type) => Staff)
  technical_lead: Staff[];

  @Column((type) => Staff)
  business_analyst: Staff[];

  @Column((type) => Staff)
  developers: Staff[];

  @Column((type) => Staff)
  testers: Staff[];

  @Column((type) => Staff)
  technical_consultant: Staff[];
}
