import { Project } from "src/projects/entities/project.entity";
import { Staff } from "src/staffs/entities/staff.entity";
import { Column, Entity, ObjectId, ObjectIdColumn } from "typeorm";

@Entity("claims")
export class Claim {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  status: string;

  @Column((type) => Staff)
  staff: Staff;

  @Column((type) => Project)
  project: Project;

  @Column((type) => Record)
  records: Record[];

  @Column()
  remarks: string;

  @Column({ type: "date" })
  created_at: string;

  @Column({ type: "date" })
  updated_at: string;
}

class Record {
  @Column({ type: "date" })
  date: string;

  @Column()
  day_of_week: string;

  @Column({ type: "datetime" })
  from: string;

  @Column({ type: "datetime" })
  to: string;

  @Column()
  remarks: string;

  @Column()
  amount: number;
}
