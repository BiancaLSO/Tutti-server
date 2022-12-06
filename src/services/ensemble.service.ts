import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Ensemble, EnsembleDocument } from './../schemas/ensemble.schema';
import { UpdateEnsembleDto } from './../dto/update-ensemble.dto';
import { CreateEnsembleDto } from './../dto/create-ensemble.dto';

@Injectable()
export class EnsembleService {
  findOne: any;
  constructor(
    @InjectModel(Ensemble.name) private ensembleModel: Model<EnsembleDocument>,
  ) {}

  createEnsemble(createEnsembleDto: CreateEnsembleDto): Promise<Ensemble> {
    const createdEnsemble = new this.ensembleModel(createEnsembleDto);
    return createdEnsemble.save();
  }

  findAll(): Promise<Ensemble[]> {
    return this.ensembleModel.find().exec();
  }

  updateEnsemble(id: string, updateEnsembleDto: UpdateEnsembleDto) {
    const newEnsemble = this.ensembleModel
      .findByIdAndUpdate(id, updateEnsembleDto)
      .setOptions({ overwrite: true, new: true })
      .populate('name')
      .populate('description')
      .populate('link')
      .populate('address')
      .populate('activeMusicians')
      .populate('practiceFrequency')
      .populate('genre')
      .populate('lookUpInfo');

    if (!newEnsemble) {
      throw new NotFoundException();
    }
    return newEnsemble;
  }

  deleteEnsemble(id: string) {
    return this.ensembleModel.findOneAndDelete({ _id: id });
  }

  deleteAll(deleteCriteria: any) {
    return this.ensembleModel.deleteMany(deleteCriteria);
  }
}
