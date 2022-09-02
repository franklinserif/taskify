/**
 * User typeorm entity
 * @module db/entity/user
 */

import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Auth } from "./Auth";

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

  @Column({ nullable: true })
  jwt: string;

  @Column({ select: false })
  password: string;

  @Column({ default: false })
  isActive: boolean;

  @OneToOne(() => Auth)
  @JoinColumn()
  auth: Auth;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
