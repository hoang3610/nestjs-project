import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../modules/users/users.service';
import { JwtPayload } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    // FIX: Sử dụng đúng path để truy cập JWT secret
    const jwtSecret = configService.get<string>('app.jwt.secret');
    
    if (!jwtSecret) {
      throw new Error('JWT_SECRET is not defined in environment variables');
    }

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
    });
  }

  async validate(payload: JwtPayload) {
    // FIX: Handle null return từ findById
    try {
      const user = await this.usersService.findById(payload.sub);
      return user; // findById đã throw NotFoundException nếu không tìm thấy
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}