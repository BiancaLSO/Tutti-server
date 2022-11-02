import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostCard, PostCardSchema } from 'src/schemas/post-card.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PostCard.name, schema: PostCardSchema },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class PostCardModule {}
