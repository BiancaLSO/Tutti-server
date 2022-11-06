import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Musician, MusicianDocument } from 'src/schemas/musician.schema';
import { CreateMusicianDto } from 'src/dto/create-musician.dto';





@Injectable()
export class MusicianService {
  constructor(@InjectModel(Musician.name) private musicianModel: Model<MusicianDocument>) {}

  async create(createMusicianDto: CreateMusicianDto): Promise<Musician> {
    const createdMusician = new this.musicianModel(createMusicianDto);
    return createdMusician.save();
  }

  async findAll(): Promise<Musician[]> {
    return this.musicianModel.find().exec();
  }
}
