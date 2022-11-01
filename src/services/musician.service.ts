import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Musician, MusicianDocument } from 'src/schemas/musician.schema';




@Injectable()
export class MusicianService {
  constructor(@InjectModel(Musician.name) private musicianModel: Model<MusicianDocument>) {}

//   async create(createCatDto: CreateCatDto): Promise<Cat> {
//     const createdCat = new this.catModel(createCatDto);
//     return createdCat.save();
//   }

  async findAll(): Promise<Musician[]> {
    return this.musicianModel.find().exec();
  }
}
