import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Instrument } from 'src/utils/instruments';

export type PostCardDocument = PostCard & Document;

@Schema()
export class PostCard {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  instrument: Instrument;

  @Prop()
  genre: string;

  @Prop()
  location: string;
}

export const PostCardSchema = SchemaFactory.createForClass(PostCard);
