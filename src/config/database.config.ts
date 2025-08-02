// src/config/database.config.ts
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export default registerAs('database', () => ({
  // MySQL Database - cho Users
  mysql: {
    type: 'mysql' as const,
    host: process.env.MYSQL_HOST || 'localhost',
    port: parseInt(process.env.MYSQL_PORT || '3306', 10),
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASS || '',
    database: process.env.MYSQL_DB || 'nestjs_users',
    // synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
  } as TypeOrmModuleOptions,

  // PostgreSQL Database - cho Products và Carts
  postgres: {
    type: 'postgres' as const,
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
    username: process.env.POSTGRES_USER || 'postgres',
    password: process.env.POSTGRES_PASS || 'hoang123',
    database: process.env.POSTGRES_DB || 'nestjs_products',
    // synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
  } as TypeOrmModuleOptions,
}));