import {  Body, Controller, HttpException, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { Logger } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  async login(@Request() req) {
    const { username, password } = req.body;
    Logger.log(`username ${username}`, 'username');
    Logger.log(`password ${password}`, 'password');
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new HttpException('Invalid credentials',400);
    }
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('profile')
  getProfile(@Request() req) {
    return req.user;
  }
  
  @Post('register')
  async register(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    if (!username || !password) {
      throw new  HttpException('username and password are required',400);
    }
    return this.authService.register({ name: username, password });
  }
}
