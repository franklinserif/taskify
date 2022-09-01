/**
 * User typeorm entity
 * @module db/entity/user
 */

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

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

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: true })
  isActive: boolean;
}
