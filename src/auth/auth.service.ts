import { Injectable, Request, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { authDto } from './dto/auth.dto';
import { userDto } from 'src/users/dto/users.dto';
@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService
    ) {}
  async generteToken(user: userDto) {
    const payload = {
      id: user.id,
      name: user.name,
      surname: user.surname,
      number: user.number,
      role: user.role,
      birthday: user.birthday,
      country: user.country
    }
    return {
      token: this.jwtService.sign(payload)
    }
  }
  async login(authDto: authDto) {
    const validate = await this.ValidateUser(authDto)
    return await this.generteToken(validate)
  }

  async ValidateUser(authDto: authDto) {
    const user: User = await this.usersService.getUserByEmail(authDto.number)
    if (user) {
      const passwordEqual = await bcrypt.compare(authDto.password, user.password)
      if (passwordEqual) {
        return user;
      }
      else {
        throw new UnauthorizedException({ mesaage: 'It is number or password wrong' })
      }
    }
    throw new UnauthorizedException({ mesaage: 'It is number or password wrong' })
  }
}