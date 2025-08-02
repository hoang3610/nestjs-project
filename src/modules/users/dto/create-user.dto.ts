// src/modules/users/dto/create-user.dto.ts
import { IsEmail, IsString, IsEnum, IsOptional, IsArray, IsObject, IsPhoneNumber, IsDateString, IsDecimal } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'SecurePassword123!', description: 'User password' })
  @IsString()
  password: string;

  @ApiProperty({ example: 'John', description: 'User first name' })
  @IsString()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'User last name' })
  @IsString()
  lastName: string;

  @ApiPropertyOptional({
    enum: ['admin', 'user'],
    default: 'user',
    description: 'User role'
  })
  @IsEnum(['admin', 'user'])
  @IsOptional()
  role?: 'admin' | 'user';

  // MySQL specific fields
  @ApiPropertyOptional({ example: '+1234567890', description: 'Phone number (MySQL only)' })
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @ApiPropertyOptional({ example: '1990-01-01', description: 'Date of birth (MySQL only)' })
  @IsOptional()
  @IsDateString()
  dateOfBirth?: string;

  @ApiPropertyOptional({ description: 'User biography (MySQL only)' })
  @IsOptional()
  @IsString()
  biography?: string;

  @ApiPropertyOptional({ description: 'MySQL specific field' })
  @IsOptional()
  @IsString()
  mysqlSpecificField?: string;

  // PostgreSQL specific fields
  @ApiPropertyOptional({
    example: ['developer', 'tech', 'javascript'],
    description: 'User tags array (PostgreSQL only)'
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({
    example: '1000.50',
    description: 'Account balance (PostgreSQL only)'
  })
  @IsOptional()
  @IsDecimal()
  balance?: number;

  @ApiPropertyOptional({
    description: 'Flexible JSON data (PostgreSQL only)',
    example: { preferences: { theme: 'dark' } }
  })
  @IsOptional()
  @IsObject()
  postgresSpecificData?: any;

  @ApiPropertyOptional({
    description: 'User settings (PostgreSQL only)',
    example: {
      theme: 'dark',
      language: 'en',
      notifications: { email: true, sms: false, push: true }
    }
  })
  @IsOptional()
  @IsObject()
  settings?: {
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
}