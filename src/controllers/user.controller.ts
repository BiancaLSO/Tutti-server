import {
    Body,
    Controller,
    Get,
    Post,
  } from '@nestjs/common';

import { UserService } from 'src/services/user.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User } from 'src/schemas/user.schema';
  
  @Controller('signup')
  export class UserController {
    constructor(private readonly userService: UserService) {}
  
    @Get()
    getAllUsers(): Promise<User[]> {
      return this.userService.findAll();
    }
  
    @Post()
    create(@Body() CreateUserDto: CreateUserDto) {
      return this.userService.create(CreateUserDto);
    }
  
  }
  