// src/modules/users/interfaces/index.ts
import { Repository } from 'typeorm';
import { MySQLUser } from '../entities/mysql/user.entity';
import { PostgreSQLUser } from '../entities/postgres/user.entity';

export interface IUsersService {
    findById(id: number, dbType?: DatabaseType): Promise<MySQLUser | PostgreSQLUser>;
    findByEmail(email: string, dbType?: DatabaseType): Promise<MySQLUser | PostgreSQLUser | null>;
    create(userData: any, dbType?: DatabaseType): Promise<MySQLUser | PostgreSQLUser>;
    update(id: number, userData: any, dbType?: DatabaseType): Promise<MySQLUser | PostgreSQLUser>;
    remove(id: number, dbType?: DatabaseType): Promise<void>;
}

export type MySQLUserRepository = Repository<MySQLUser>;
export type PostgreSQLUserRepository = Repository<PostgreSQLUser>;

// Enum để chọn database
export enum DatabaseType {
    MYSQL = 'mysql',
    POSTGRES = 'postgres',
}