import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { UserService } from './../services/user.service';
import { CreateUserDto } from './../dto/create-user.dto';
import { User } from './../schemas/user.schema';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UpdateUserDto } from './../dto/update-user.dto';
import { CreateEnsembleDto } from './../dto/create-ensemble.dto';

@Controller('profile')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/loggedin/:id')
  findById(@Param('id') id: string): Promise<User> {
    return this.userService.findById(id);
  }

  @Get()
  getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Post('/signup')
  createUser(@Body() CreateUserDto: CreateUserDto) {
    return this.userService.createUser(CreateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/ensembles')
  addEnsemble(
    @Param('id') id: string,
    @Body() ensemble: CreateEnsembleDto,
  ): Promise<User> {
    return this.userService.addEnsemble(id, ensemble);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/ensembles/:enId')
  deleteEnsemble(
    @Param('id') id: string,
    @Param('enId') enId: string,
  ): Promise<User> {
    return this.userService.deleteEnsemble(id, enId);
  }
}
