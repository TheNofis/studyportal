import { Controller, Get, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import ResponseModule, { IResponse } from 'src/common/response/response.module';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Req() req): Promise<IResponse> {}
}
