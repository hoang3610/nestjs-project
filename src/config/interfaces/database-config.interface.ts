// src/config/interfaces/database-config.interface.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface DatabaseConfig {
  mysql: TypeOrmModuleOptions;
  postgres: TypeOrmModuleOptions;
}

export interface AppConfig {
  port: number;
  apiPrefix: string;
  jwt: {
    secret: string;
    expiresIn: string;
  };
}