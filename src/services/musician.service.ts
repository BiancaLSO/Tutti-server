import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Musician, MusicianDocument } from 'src/schemas/musician.schema';

@Injectable()
export class MusicianService {
  constructor(
    @InjectModel(Musician.name) private musicianModel: Model<MusicianDocument>,
  ) {}

  async create(createMusicianDto: CreateMusicianDto): Promise<Musician> {
    const createdMusician = new this.musicianModel(createMusicianDto);
    return createdMusician.save();
  }

  async findAll(): Promise<Musician[]> {
    return this.musicianModel.find().exec();
  }

  async updateMusician(id: string, musician: Musician) {
    const newMusician = await this.musicianModel
      .findByIdAndUpdate(id, musician)
      .setOptions({ overwrite: true, new: true })
      .populate('fullName')
      .populate('phoneNo')
      .populate('instruments')
      .populate('description')
      .populate('ensembles')
      .populate('posts');

    if (!newMusician) {
      throw new NotFoundException();
    }
    return newMusician;
  }
}
