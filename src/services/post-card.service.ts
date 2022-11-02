import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostCard, PostCardDocument } from 'src/schemas/post-card.schema';

@Injectable()
export class PostCardService {
  constructor(
    @InjectModel(PostCard.name)
    private postCardModel: Model<PostCardDocument>,
  ) {}

  //   async create(createCatDto: CreateCatDto): Promise<Cat> {
  //     const createdCat = new this.catModel(createCatDto);
  //     return createdCat.save();
  //   }

  async findAll(): Promise<PostCard[]> {
    return this.postCardModel.find().exec();
  }
}
