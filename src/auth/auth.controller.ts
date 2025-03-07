import { Body, Controller, Get, Post, Req, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDto } from './dto/login-auth.dto';

import { ISession } from 'src/common/interfaces/session.interface';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto: LoginAuthDto, @Session() session: ISession) {
    return this.authService.login(dto, session);
  }

  @Post('register')
  async register(@Body() dto: RegisterAuthDto, @Session() session: ISession) {
    return this.authService.register(dto, session);
  }
}
