import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Musician, MusicianDocument } from 'src/schemas/musician.schema';
import { CreateMusicianDto } from 'src/dto/create-musician.dto';
import { UpdateMusicianDto } from 'src/dto/update-musician.dto';

@Injectable()
export class MusicianService {
  findOne: any;
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

  updateMusician(id: string, updateMusicianDto: UpdateMusicianDto) {
    const newMusician = this.musicianModel
      .findByIdAndUpdate(id, updateMusicianDto)
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

  deleteMusician(id: string) {
    return this.musicianModel.findOneAndDelete({ _id: id });
  }
}
