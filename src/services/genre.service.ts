import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Genre, GenreDocument } from 'src/schemas/genre.schema';


@Injectable()
export class GenreService {
  constructor(@InjectModel(Genre.name) private genreModel: Model<GenreDocument>) {}

//   async create(createGenreDto: CreateGenreDto): Promise<Genre> {
//     const createdGenre = new this.genreModel(createGenreDto);
//     return createdCat.save();
//   }

  async findAll(): Promise<Genre[]> {
    return this.genreModel.find().exec();
  }
}
