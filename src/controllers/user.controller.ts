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
import { InjectModel } from '@nestjs/mongoose';
import { UserService } from './../services/user.service';
import { CreateUserDto } from './../dto/create-user.dto';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UpdateUserDto } from './../dto/update-user.dto';
import { CreateEnsembleDto } from './../dto/create-ensemble.dto';
import { User, UserDocument } from '.././schemas/user.schema';
import { Model } from 'mongoose';

@Controller('profile')
export class UserController {
  constructor(private readonly userService: UserService,
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    ) {}

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
async addEnsemble(
  @Param('id') id: string,
  @Body() ensemble: CreateEnsembleDto,
): Promise<User> {
  try {
    // Find the user
    const user = await this.userModel.findById(id);

    // Check if the user already has an ensemble with the same name
    if (user.ensembles.some(e => e.name === ensemble.name)) {
      throw new HttpException('Ensemble already added to user', HttpStatus.BAD_REQUEST);
    }
    // Add the ensemble to the user's list of ensembles
    user.ensembles.push(ensemble);
    return user.save();
  } catch (error) {
    console.error(error);
    throw new HttpException('The ensamble is already here', HttpStatus.BAD_REQUEST);
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
