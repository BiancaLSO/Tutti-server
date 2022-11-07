import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Musician, MusicianDocument } from 'src/schemas/musician.schema';
import { CreateMusicianDto } from 'src/dto/create-musician.dto';

@Injectable()
export class MusicianService {
  constructor(
    @InjectModel(Musician.name) private musicianModel: Model<MusicianDocument>,
  ) {}

  create(createMusicianDto: CreateMusicianDto): Promise<Musician> {
    const createdMusician = new this.musicianModel(createMusicianDto);
    return createdMusician.save();
  }

  findAll(): Promise<Musician[]> {
    return this.musicianModel.find().exec();
  }

  updateMusician(id: string, musician: Musician) {
    const newMusician = this.musicianModel
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
