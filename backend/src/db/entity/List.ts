/**
 * list typeorm entity
 * @module db/entity/list
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
  ManyToOne,
} from "typeorm";

import { User } from "./User";
import { Task } from "./Task";
import { Workspace } from "./Workpace";

/**
 * Represent the list table
 */
@Entity()
export class List extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  color: string;

  @ManyToOne(() => User, (user) => user.lists)
  user: User;

  @ManyToOne(() => Workspace, (workspace) => workspace.lists)
  workspace: Workspace;

  @OneToMany(() => Task, (task) => task.list)
  tasks: Task[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
