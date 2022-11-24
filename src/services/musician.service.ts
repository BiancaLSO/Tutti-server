import mongoose, { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Musician, MusicianDocument } from '.././schemas/musician.schema';
import { CreateMusicianDto } from 'src/dto/create-musician.dto';
import { UpdateMusicianDto } from 'src/dto/update-musician.dto';
import { CreateEnsembleDto } from 'src/dto/create-ensemble.dto';

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

  // async addEnsemble(id: string, ensemble: CreateEnsembleDto) {
  //   const ensmebleArray = await this.musicianModel
  //     .findById(id)
  //     .populate({ path: 'musicians', select: 'ensembles' });

  //   console.log(ensmebleArray);
  // }

  async addEnsemble(id: string, en: CreateEnsembleDto) {

    const updateMusician = await this.musicianModel.findById(id);
    updateMusician.ensembles.push(en);
  
    return updateMusician.save();
  }

  async deleteEnsemble(id: string, enId: string) {
    const updateBusiness = await this.musicianModel.findById(id);

    const filteredBcs = updateBusiness.ensembles.filter(
      (ensemble: any) => {
        return ensemble.toString() !== enId;
      },
    );
    updateBusiness.ensembles = filteredBcs;

    return updateBusiness.save();
  }
}


