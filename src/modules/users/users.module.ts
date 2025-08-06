// src/modules/users/users.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

// Import entities từ các thư mục con
import { MySQLUser } from './entities/mysql/user.entity';
import { PostgreSQLUser } from './entities/postgres/user.entity';

@Module({
  imports: [
    // Import cho MySQL connection
    // TypeOrmModule.forFeature([MySQLUser], 'mysql'),
    // Import cho PostgreSQL connectionu
    TypeOrmModule.forFeature([PostgreSQLUser], 'postgres'),
  ],
  controllers: [UsersController],
  providers: [UsersService], // providers là điều kiện bắt buộc Giúp Nest biết rằng: "tôi có một provider tên là UsersService để tạo instance khi cần => có provider thì controller mới hiểu được
  exports: [UsersService],
})
export class UsersModule { }