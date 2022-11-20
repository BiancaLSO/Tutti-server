import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { User, UserDocument } from '.././schemas/user.schema';
import { encodePassword } from '.././utils/bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const password = encodePassword(createUserDto.password);
    const createdUser = new this.userModel({ ...createUserDto, password });
    return createdUser.save();
  }
}
