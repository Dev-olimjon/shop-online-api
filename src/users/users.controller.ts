import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { userDto } from './dto/users.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/auth/roles-auth.decorater';
import { RoleGuard } from 'src/auth/role.guard';
// import { RolehGuard } from 'src/auth/role.guard'

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Post()
    async addUser(@Body() User: userDto) {
        this.usersService.addUser(User)
            .then(createdUser => {
                console.log(createdUser)
                return createdUser
            })
            .catch(err => {
                console.error(err)
                return err
            })
    }
    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @Get()
    async getAll() {
        return this.usersService.getAll()
    }

    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @Get('/:id')
    async getOne(@Param('id') id: string) {
        this.usersService.getOne(id)
            .then(user => {
                console.log(user)
                return user
            })
            .catch(err => {
                console.log(err)
                return err
            })
    }
    
    @Roles('ADMIN')
    @UseGuards(RoleGuard)
    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        this.usersService.deleteUser(id)
            .then(user => {
                console.log(user)
                return user
            })
            .catch(err => {
                console.log(err)
                return err
            })
    }
    @UseGuards(AuthGuard)
    @Put('/:id')
    async editUser(@Param('id') id: string, @Body() newUser: userDto) {
        this.usersService.editUser(id, newUser)
            .then(newuser => {
                console.log(newuser)
                return newUser
            })
            .catch(err => {
                console.log(err)
                return err
            })
    }
}
