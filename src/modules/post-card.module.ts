import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostCardController } from 'src/controllers/post-card.controller';
import { PostCard, PostCardSchema } from 'src/schemas/post-card.schema';
import { PostCardService } from 'src/services/post-card.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostCard.name, schema: PostCardSchema },
    ]),
  ],
  controllers: [PostCardController],
  providers: [PostCardService],
})
export class PostCardModule {}
