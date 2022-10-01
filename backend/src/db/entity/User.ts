/**
 * User typeorm entity
 * @module db/entity/user
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  JoinTable,
} from "typeorm";

import { List } from "./List";
import { Workspace } from "./Workpace";

/**
 * Represent the user table
 */
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true, name: "refresh_token" })
  refreshToken: string;

  @Column({ nullable: true, name: "confirm_code" })
  confirmCode: number;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToMany(() => List, (list) => list.user)
  lists: List[];

  @ManyToMany(() => Workspace)
  @JoinTable()
  workspaces: Workspace[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
