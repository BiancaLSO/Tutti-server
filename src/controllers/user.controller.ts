import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
    try{
    return this.userService.findAll();
    } catch (error){
      console.error(error);
      // Handle the error
      throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('/signup')
  createUser(@Body() CreateUserDto: CreateUserDto) {
    try {
    return this.userService.createUser(CreateUserDto);
    } catch (error) {
      console.error(error);
      throw new HttpException('Validation Error', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try{
    return this.userService.updateUser(id, updateUserDto);
    } catch (error) {
      console.error(error);
      throw new HttpException('Validation Error', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    try{
    return this.userService.deleteUser(id);
    }catch (error){
      console.error(error);
      throw new HttpException('Validation Error', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/ensembles')
  addEnsemble(
    @Param('id') id: string,
    @Body() ensemble: CreateEnsembleDto,
  ): Promise<User> { try{
    return this.userService.addEnsemble(id, ensemble);
  } catch (error) {
    console.error(error);
    throw new HttpException('Validation Error', HttpStatus.BAD_REQUEST);
  }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/ensembles/:enId')
  deleteEnsemble(
    @Param('id') id: string,
    @Param('enId') enId: string,
  ): Promise<User> { try{
    return this.userService.deleteEnsemble(id, enId);
  } catch (error){
    console.error(error);
    throw new HttpException('Validation Error', HttpStatus.BAD_REQUEST);
  } 
  }
}
