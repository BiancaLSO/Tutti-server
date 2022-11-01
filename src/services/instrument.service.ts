import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Instrument, InstrumentDocument } from 'src/schemas/instrument.schema';

@Injectable()
export class IntrumentService {
  constructor(@InjectModel(Instrument.name) private instrumentModel: Model<InstrumentDocument>) {}

//   async create(createCatDto: CreateCatDto): Promise<Cat> {
//     const createdCat = new this.catModel(createCatDto);
//     return createdCat.save();
//   }

  async findAll(): Promise<Instrument[]> {
    return this.instrumentModel.find().exec();
  }
}
