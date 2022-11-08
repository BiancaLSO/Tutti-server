import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  //   async create(createCatDto: CreateCatDto): Promise<Cat> {
  //     const createdCat = new this.catModel(createCatDto);
  //     return createdCat.save();
  //   }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByUsername(username: string): Promise<User>{
    return this.userModel.findOne({ username: username }).exec();
  }
  create(createUserDto: CreateUserDto): Promise<User> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

}
