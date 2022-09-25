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
  ManyToOne,
  BaseEntity,
} from "typeorm";

import { User } from "./User";

/**
 * Represent the list table
 */
@Entity()
export class List extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.list)
  user: User;
}
