import { CartsModule } from './modules/carts/carts.module';
import { ProductsModule } from './modules/products/products.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './core/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { User } from './modules/users/entities/user.entity';
import { Product } from './modules/products/entities/product.entity';
import configuration from './config/configuration';
import databaseConfig from './config/database.config';
import { DatabaseConfig } from './config/interfaces/database-config.interface'; // 👈 thêm dòng này

@Module({
  imports: [
    CartsModule,
    ProductsModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration, databaseConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const db = configService.get<DatabaseConfig>('database'); // ✅ ép kiểu tại đây

        if (!db) {
          throw new Error('Database config not found');
        }

        return {
          type: db.type,
          host: db.host,
          port: db.port,
          username: db.username,
          password: db.password,
          database: db.database,
          entities: [User, Product],
          // synchronize: true,
          logging: true,
        };
      },
    }),

    AuthModule,
    UsersModule,
  ],
})
export class AppModule { }