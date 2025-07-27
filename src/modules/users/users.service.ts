import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    // Kiểm tra email đã tồn tại
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email }
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    // Kiểm tra username đã tồn tại
    const existingUsername = await this.usersRepository.findOne({
      where: { username: createUserDto.username }
    });

    if (existingUsername) {
      throw new ConflictException('Username already exists');
    }

    const user = this.usersRepository.create(createUserDto);
    console.log(user)
    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find({
      // select: ['id', 'email', 'username', 'first_name', 'last_name', 'isActive', 'created_date', 'updatedAt']
      select: ['id', 'email', 'username', 'first_name', 'last_name', 'created_date']
    });
  }

  async findById(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      select: ['id', 'email', 'username', 'first_name', 'last_name', 'created_date', 'address']
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  // FIX: Thêm null check cho findByEmail
  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email }
    });
  }

  // FIX: Thêm method findByEmailWithPassword cho authentication
  async findByEmailWithPassword(email: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'username', 'password', 'first_name', 'last_name', 'isActive']
    });
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findById(id);
    
    Object.assign(user, updateUserDto);
    
    return this.usersRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    await this.usersRepository.remove(user);
  }
}