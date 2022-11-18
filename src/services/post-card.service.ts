import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostCard, PostCardDocument } from 'src/schemas/post-card.schema';
import { CreatePostDto } from 'src/dto/create-post.dto';

@Injectable()
export class PostCardService {
  constructor(
    @InjectModel(PostCard.name)
    private postCardModel: Model<PostCardDocument>,
  ) {}

  findAll(): Promise<PostCard[]> {
    return this.postCardModel.find().exec();
  }

  async createPost(createPostDto: CreatePostDto): Promise<PostCard> {
    const createdPost = new this.postCardModel(createPostDto);
    return createdPost.save();
  }

  deletePost(id: string) {
    return this.postCardModel.findOneAndDelete({ _id: id });
  }
}
