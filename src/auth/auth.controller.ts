import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { authDto } from './dto/auth.dto';
import { request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
@Controller('auth')
export class AuthController {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private authService: AuthService,
    ) {
    }
    @Post('/login')
    async login(@Body() authDto: authDto) {
        return this.authService.login(authDto)
    }
}
