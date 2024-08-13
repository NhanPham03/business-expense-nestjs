import { Column, ObjectId, ObjectIdColumn } from "typeorm";

export class ProjectDTO {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  name: string;

  @Column({ type: "date" })
  from: string;

  @Column({ type: "date" })
  to: string;
}