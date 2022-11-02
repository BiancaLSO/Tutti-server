import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ensemble, EnsembleDocument } from 'src/schemas/ensemble.schema';

@Injectable()
export class EnsembleService {
  constructor(
    @InjectModel(Ensemble.name)
    private ensembleModel: Model<EnsembleDocument>,
  ) {}

  //   async create(createCatDto: CreateCatDto): Promise<Cat> {
  //     const createdCat = new this.catModel(createCatDto);
  //     return createdCat.save();
  //   }

  async findAll(): Promise<Ensemble[]> {
    return this.ensembleModel.find().exec();
  }
}
