// src/modules/users/users.service.ts
import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Import entities từ entities/index.ts
import { MySQLUser, PostgreSQLUser } from './entities';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { DatabaseType } from './interfaces';

@Injectable()
export class UsersService {
  constructor(
    // Inject MySQL repository
    @InjectRepository(MySQLUser, 'mysql')
    private mysqlUserRepository: Repository<MySQLUser>,

    // Inject PostgreSQL repository
    @InjectRepository(PostgreSQLUser, 'postgres')
    private postgresUserRepository: Repository<PostgreSQLUser>,
  ) { }

  // SỬA LẠI: Không dùng union type cho repository
  async create(createUserDto: CreateUserDto, dbType: DatabaseType = DatabaseType.MYSQL) {
    if (dbType === DatabaseType.MYSQL) {
      const user = this.mysqlUserRepository.create(createUserDto);
      return await this.mysqlUserRepository.save(user);
    } else if (dbType === DatabaseType.POSTGRES) {
      const user = this.postgresUserRepository.create(createUserDto);
      return await this.postgresUserRepository.save(user);
    } else {
      throw new BadRequestException('Invalid database type');
    }
  }

  async findAll(dbType: DatabaseType = DatabaseType.MYSQL) {
    if (dbType === DatabaseType.MYSQL) {
      return await this.mysqlUserRepository.find();
    } else if (dbType === DatabaseType.POSTGRES) {
      return await this.postgresUserRepository.find();
    } else {
      throw new BadRequestException('Invalid database type');
    }
  }

  async findById(id: number, dbType: DatabaseType = DatabaseType.MYSQL) {
    let user;

    if (dbType === DatabaseType.MYSQL) {
      user = await this.mysqlUserRepository.findOne({ where: { id } });
    } else if (dbType === DatabaseType.POSTGRES) {
      user = await this.postgresUserRepository.findOne({ where: { id } });
    } else {
      throw new BadRequestException('Invalid database type');
    }

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found in ${dbType} database`);
    }
    return user;
  }

  async findByEmail(email: string, dbType: DatabaseType = DatabaseType.MYSQL) {
    if (dbType === DatabaseType.MYSQL) {
      return await this.mysqlUserRepository.findOne({ where: { email } });
    } else if (dbType === DatabaseType.POSTGRES) {
      return await this.postgresUserRepository.findOne({ where: { email } });
    } else {
      throw new BadRequestException('Invalid database type');
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto, dbType: DatabaseType = DatabaseType.MYSQL) {
    if (dbType === DatabaseType.MYSQL) {
      await this.mysqlUserRepository.update(id, updateUserDto);
      return this.findById(id, dbType);
    } else if (dbType === DatabaseType.POSTGRES) {
      await this.postgresUserRepository.update(id, updateUserDto);
      return this.findById(id, dbType);
    } else {
      throw new BadRequestException('Invalid database type');
    }
  }

  async remove(id: number, dbType: DatabaseType = DatabaseType.MYSQL) {
    let result;

    if (dbType === DatabaseType.MYSQL) {
      result = await this.mysqlUserRepository.delete(id);
    } else if (dbType === DatabaseType.POSTGRES) {
      result = await this.postgresUserRepository.delete(id);
    } else {
      throw new BadRequestException('Invalid database type');
    }

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found in ${dbType} database`);
    }
  }

  // Phương thức để sync data giữa 2 database
  async syncUserBetweenDatabases(userId: number, fromDb: DatabaseType, toDb: DatabaseType) {
    const user = await this.findById(userId, fromDb);

    // Tạo object mới với các field chung
    const userData = {
      email: user.email,
      password: user.password,
      firstName: user.firstName,
      lastName: user.lastName,
      role: user.role,
      isActive: user.isActive,
    };

    // Xử lý từng database riêng biệt
    if (toDb === DatabaseType.MYSQL) {
      const newUser = this.mysqlUserRepository.create(userData);
      return await this.mysqlUserRepository.save(newUser);
    } else if (toDb === DatabaseType.POSTGRES) {
      const newUser = this.postgresUserRepository.create(userData);
      return await this.postgresUserRepository.save(newUser);
    } else {
      throw new BadRequestException('Invalid target database type');
    }
  }

  // Phương thức để tìm user ở cả 2 database
  async findUserInBothDatabases(email: string) {
    const [mysqlUser, postgresUser] = await Promise.all([
      this.findByEmail(email, DatabaseType.MYSQL).catch(() => null),
      this.findByEmail(email, DatabaseType.POSTGRES).catch(() => null),
    ]);

    return {
      mysql: mysqlUser,
      postgres: postgresUser,
    };
  }

  // Phương thức đặc biệt cho authentication - mặc định tìm trong MySQL
  async findByEmailForAuth(email: string): Promise<MySQLUser | null> {
    return await this.mysqlUserRepository.findOne({ where: { email } });
  }

  // Helper methods với type cụ thể
  async createInMySQL(createUserDto: CreateUserDto): Promise<MySQLUser> {
    const user = this.mysqlUserRepository.create(createUserDto);
    return await this.mysqlUserRepository.save(user);
  }

  async createInPostgreSQL(createUserDto: CreateUserDto): Promise<PostgreSQLUser> {
    const user = this.postgresUserRepository.create(createUserDto);
    return await this.postgresUserRepository.save(user);
  }

  async updateInMySQL(id: number, updateUserDto: UpdateUserDto): Promise<MySQLUser> {
    await this.mysqlUserRepository.update(id, updateUserDto);
    const user = await this.mysqlUserRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found in MySQL database`);
    }
    return user;
  }

  async updateInPostgreSQL(id: number, updateUserDto: UpdateUserDto): Promise<PostgreSQLUser> {
    await this.postgresUserRepository.update(id, updateUserDto);
    const user = await this.postgresUserRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found in PostgreSQL database`);
    }
    return user;
  }

  // Utility method để get specific repository (nếu cần dùng trong các method khác)
  getMySQLRepository(): Repository<MySQLUser> {
    return this.mysqlUserRepository;
  }

  getPostgreSQLRepository(): Repository<PostgreSQLUser> {
    return this.postgresUserRepository;
  }

  // THÊM METHOD NÀY - cho authentication với password
  async findByEmailWithPassword(email: string, dbType: DatabaseType = DatabaseType.MYSQL): Promise<MySQLUser | PostgreSQLUser | null> {
    if (dbType === DatabaseType.MYSQL) {
      return await this.mysqlUserRepository.findOne({
        where: { email },
        select: ['id', 'email', 'password', 'firstName', 'lastName', 'role', 'isActive', 'createdAt', 'updatedAt']
      });
    } else if (dbType === DatabaseType.POSTGRES) {
      return await this.postgresUserRepository.findOne({
        where: { email },
        select: ['id', 'email', 'password', 'firstName', 'lastName', 'role', 'isActive', 'createdAt', 'updatedAt']
      });
    } else {
      throw new BadRequestException('Invalid database type');
    }
  }
}