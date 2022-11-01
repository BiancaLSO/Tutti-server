import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PracticeFrequency, PracticeFrequencyDocument } from 'src/schemas/practice-frequency.schema';


@Injectable()
export class PracticeFrequencyService {
  constructor(@InjectModel(PracticeFrequency.name) private practiceFrequencyModel: Model<PracticeFrequencyDocument>) {}

//   async create(createCatDto: CreateCatDto): Promise<Cat> {
//     const createdCat = new this.catModel(createCatDto);
//     return createdCat.save();
//   }

  async findAll(): Promise<PracticeFrequency[]> {
    return this.practiceFrequencyModel.find().exec();
  }
}
