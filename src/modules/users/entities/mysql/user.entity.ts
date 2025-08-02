// src/modules/users/entities/mysql/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('users')
@Index(['email'], { unique: true })
export class MySQLUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 100 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 50 })
  firstName: string;

  @Column({ length: 50 })
  lastName: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user'
  })
  role: 'admin' | 'user';

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // MySQL specific fields
  @Column({ type: 'text', nullable: true, comment: 'Additional data specific to MySQL' })
  mysqlSpecificField: string;

  @Column({ type: 'varchar', length: 20, nullable: true, comment: 'Phone number' })
  phone: string;

  @Column({ type: 'date', nullable: true, comment: 'Date of birth' })
  dateOfBirth: Date;

  // MySQL supports MEDIUMTEXT for larger text data
  @Column({ type: 'mediumtext', nullable: true, comment: 'User biography' })
  biography: string;

  // MySQL specific timestamp with microseconds
  @Column({
    type: 'timestamp',
    precision: 6,
    nullable: true,
    comment: 'Last login time with microseconds precision'
  })
  lastLoginAt: Date;
}