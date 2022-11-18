import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Instrument } from './instrument.schema';

export type PostCardDocument = PostCard & Document;

@Schema()
export class PostCard {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  instrument: string;

  @Prop()
  genre: string;

  @Prop()
  location: string;

  //   @Prop()
  //   LookupType: boolean;
}

export const PostCardSchema = SchemaFactory.createForClass(PostCard);
