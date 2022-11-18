import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreatePostDto } from 'src/dto/create-post.dto';
import { PostCard } from 'src/schemas/post-card.schema';
import { PostCardService } from 'src/services/post-card.service';

@Controller('home')
export class PostCardController {
  constructor(private readonly postCardService: PostCardService) {}

  @Get()
  getAllMusicians(): Promise<PostCard[]> {
    return this.postCardService.findAll();
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postCardService.createPost(createPostDto);
  }

  @Delete(':id')
  deletePost(@Param('id') id: string) {
    return this.postCardService.deletePost(id);
  }
}
