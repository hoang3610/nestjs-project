// src/config/interfaces/database-config.interface.ts
export interface DatabaseConfig {
  type: 'mysql' | 'postgres'; // hoặc các DB bạn hỗ trợ
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}
