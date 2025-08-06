// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

// Modules
import { CartsModule } from './modules/carts/carts.module';
import { ProductsModule } from './modules/products/products.module';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

// Import entities từ đường dẫn chính xác
import { MySQLUser } from './modules/users/entities/mysql/user.entity';
import { PostgreSQLUser } from './modules/users/entities/postgres/user.entity';
import { Product } from './modules/products/entities/product.entity';
import { Cart } from './modules/carts/entities/cart.entity';

// Configurations
import configuration from './config/configuration';
import databaseConfig from './config/database.config';
import { DatabaseConfig } from './config/interfaces/database-config.interface';

@Module({
  imports: [
    // Config Module
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, databaseConfig],
      envFilePath: ['.env', '.env.local'],
    }),

    // MySQL Database Connection
    // TypeOrmModule.forRootAsync({
    //   name: 'mysql',
    //   imports: [ConfigModule],
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => {
    //     const dbConfig = configService.get<DatabaseConfig>('database');

    //     if (!dbConfig?.mysql) {
    //       throw new Error('MySQL database config not found');
    //     }

    //     return {
    //       ...dbConfig.mysql,
    //       entities: [MySQLUser], // Chỉ MySQL User entity
    //       name: 'mysql',
    //     };
    //   },
    // }),

    // PostgreSQL Database Connection
    TypeOrmModule.forRootAsync({
      name: 'postgres',
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const dbConfig = configService.get<DatabaseConfig>('database');

        if (!dbConfig?.postgres) {
          throw new Error('PostgreSQL database config not found');
        }

        return {
          ...dbConfig.postgres,
          // entities: [PostgreSQLUser, Product, Cart], // PostgreSQL entities
          entities: [PostgreSQLUser], // PostgreSQL entities
          name: 'postgres',
        };
      },
    }),

    // Business Modules
    UsersModule, // có thể tạo user => ví dụ như admin tạo NV
    AuthModule, // users tự đăng ký, có ràng buộc
    // ProductsModule,
    // CartsModule,
  ],
})
export class AppModule { }