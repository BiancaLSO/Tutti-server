import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateEnsembleDto } from 'src/dto/create-ensemble.dto';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { UpdateUserDto } from 'src/dto/update-user.dto';
import { User, UserDocument } from '.././schemas/user.schema';
import { encodePassword } from '.././utils/bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().populate('ensembles');
  }

  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ username: username }).exec();
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const password = encodePassword(createUserDto.password);
    const createdUser = new this.userModel({ ...createUserDto, password });
    return createdUser.save();
  }

  updateUser(id: string, updateUser: UpdateUserDto) {
    const newUser = this.userModel
      .findByIdAndUpdate(id, updateUser)
      .setOptions({ overwrite: true, new: true })
      .populate('username')
      .populate('email')
      .populate('password')
      .populate('fullName')
      .populate('phoneNo')
      .populate('instrument')
      .populate('description')
      .populate('ensembles');

    if (!newUser) {
      throw new NotFoundException();
    }
    return newUser;
  }

  deleteUser(id: string) {
    return this.userModel.findOneAndDelete({ _id: id });
  }

  async addEnsemble(id: string, en: CreateEnsembleDto) {
    const updateUser = await this.userModel.findById(id);
    updateUser.ensembles.push(en);

    return updateUser.save();
  }

  async deleteEnsemble(id: string, enId: string) {
    const updateUser = await this.userModel.findById(id);

    const filteredEnsembles = updateUser.ensembles.filter((ensemble: any) => {
      return ensemble.toString() !== enId;
    });
    updateUser.ensembles = filteredEnsembles;

    return updateUser.save();
  }
}
