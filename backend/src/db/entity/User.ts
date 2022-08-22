/**
 * User typeorm entity
 * @module db/entity/user
 */

import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

/**
 * Represent the user table
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  isActive: boolean;
}
