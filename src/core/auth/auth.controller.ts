import { Controller, Post, Body, UseGuards, Request, Get } from '@nestjs/common';
import { AuthService, LoginDto } from './auth.service';
import { LocalAuthGuard } from '../../common/guards/local-auth.guard';
import { CreateUserDto } from '../../modules/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Get('')
  async hello() {
    return this.authService.getHello('Hello world!!!');
  }

}