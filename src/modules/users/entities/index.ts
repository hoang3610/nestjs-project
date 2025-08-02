// src/modules/users/entities/user.entity.ts

// Import entities trước khi sử dụng
import { MySQLUser } from './mysql/user.entity';
import { PostgreSQLUser } from './postgres/user.entity';

// Base interface cho tất cả User entities
export interface BaseUser {
    id: number;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role: 'admin' | 'user';
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

// Re-export specific entities để có thể import từ file này
export { MySQLUser } from './mysql/user.entity';
export { PostgreSQLUser } from './postgres/user.entity';

// Union type cho việc sử dụng trong service
export type User = MySQLUser | PostgreSQLUser;

// Default export cho BaseUser interface
export default BaseUser;