/**
 * User typeorm entity
 * @module db/entity/workspace
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
} from "typeorm";

import { List } from "./List";
import { User } from "./User";

/**
 * Represent the workspace table
 */
@Entity()
export class Workspace extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @ManyToOne(() => User, (user) => user.lists)
  user: User;

  @OneToMany(() => List, (list) => list.workspace)
  lists: List[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
