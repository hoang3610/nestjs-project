import { registerAs } from '@nestjs/config'; // ✅ BẮT BUỘC nếu dùng registerAs

export default registerAs('database', () => ({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'gas',
}));
