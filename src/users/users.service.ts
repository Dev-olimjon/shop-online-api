import { Get, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { userDto } from './dto/users.dto';
import { v4 as uuid } from 'uuid'
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
   constructor(@InjectModel(User) private userRepository: typeof User) { }

   async addUser(UserDto: userDto) {
      const hashedPassword = await bcrypt.hash(UserDto.password, 10)
      let user: userDto = {
         id: uuid(),
         name: UserDto.name,
         surname: UserDto.surname,
         number: UserDto.number,
         password: hashedPassword,
         role: 'USER',
         birthday: UserDto.birthday,
         banned: false,
         country: UserDto.country
      }
      const createdUser = await this.userRepository.create(user)
      return createdUser
   }

   async getAll() {
      const Getall = await this.userRepository.findAll()
      return Getall
   }

   async getOne(idx: string) {
      const Getone = await this.userRepository.findOne({ where: { id: idx } })
      return Getone
   }
   async deleteUser(idx: string) {
      const Deleteuser = await this.userRepository.destroy({ where: { id: idx } })
      return Deleteuser
   }
   async editUser(idx: string, user: userDto) {
      const hashedPassword = await bcrypt.hash(user.password, 10)
      const Edituser = await this.userRepository.update({
         name: user.name,
         surname: user.surname,
         number: user.number,
         password: hashedPassword,
         country: user.country
      }, {
         where: {
            id: idx
         }
      })
      return Edituser
   }
   async getUserByEmail(number: number){
      const User: User = await this.userRepository.findOne({where: {number: number}})
      return User
   }
}