import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Instrument } from 'src/utils/instruments';
import { Ensemble } from './ensemble.schema';
import { PostCard } from './post-card.schema';

export type MusicianDocument = Musician & Document;

@Schema()
export class Musician {
  @Prop()
  fullName: string;

  @Prop()
  phoneNo: number;

  @Prop()
  instrument: Instrument;

  @Prop()
  description: string;

  @Prop()
  ensembles: Ensemble[];

  @Prop()
  posts: PostCard[];
}

export const MusicianSchema = SchemaFactory.createForClass(Musician);
