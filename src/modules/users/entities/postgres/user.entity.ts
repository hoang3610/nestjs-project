// src/modules/users/entities/postgres/user.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('users')
@Index(['email'], { unique: true })
export class PostgreSQLUser {
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

    // PostgreSQL specific fields
    @Column({
        type: 'jsonb',
        nullable: true,
        comment: 'Flexible JSON data storage for user preferences'
    })
    postgresSpecificData: any;

    @Column({
        type: 'uuid',
        nullable: true,
        comment: 'UUID for external system integration'
    })
    postgresUuid: string;

    // PostgreSQL array support
    @Column({
        type: 'text',
        array: true,
        nullable: true,
        comment: 'Array of user tags'
    })
    tags: string[];

    // PostgreSQL specific data types
    @Column({
        type: 'decimal',
        precision: 10,
        scale: 2,
        nullable: true,
        comment: 'Account balance with high precision'
    })
    balance: number;

    // JSONB for complex structured data
    @Column({
        type: 'jsonb',
        nullable: true,
        comment: 'User settings and preferences in JSONB format'
    })
    settings: {
        theme?: string;
        language?: string;
        notifications?: {
            email: boolean;
            sms: boolean;
            push: boolean;
        };
        privacy?: {
            profileVisible: boolean;
            dataSharing: boolean;
        };
    };

    // PostgreSQL full-text search
    @Column({
        type: 'tsvector',
        nullable: true,
        comment: 'Full-text search vector for user data'
    })
    searchVector: string;

    // PostgreSQL range types example
    @Column({
        type: 'tsrange',
        nullable: true,
        comment: 'Active time range for the user'
    })
    activeTimeRange: string;
}