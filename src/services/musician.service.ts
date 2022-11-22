import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  Musician,
  MusicianDocument,
  MusicianSchema,
} from '.././schemas/musician.schema';
import { CreateMusicianDto } from 'src/dto/create-musician.dto';
import { UpdateMusicianDto } from 'src/dto/update-musician.dto';
import { CreateEnsembleDto } from 'src/dto/create-ensemble.dto';
import { Ensemble } from 'src/schemas/ensemble.schema';

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

  async findAll(): Promise<Musician[]> {
    return this.musicianModel.find().populate('ensembles');
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

  // Adding an ensemble into the ensembles array (property of the musician class)
  // To be researched

  // async findAllEnsembles() {
  //   return this.musicianModel.find({}).select('ensembles');
  // }

  // async addEnsemble(id: string, ensemble: Ensemble) {
  //   return this.musicianModel
  //     .findByIdAndUpdate(id, { ensembles: ensemble._id })
  //     .populate('ensembles');
  // }

  // async findAllTest(
  //   id: string,
  //   ensemble: CreateEnsembleDto,
  // ): Promise<Musician[]> {
  //   return this.musicianModel.find({ _id: id });
  // }
}
