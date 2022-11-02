import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Genre } from './genre.schema';
import { PracticeFrequency } from './practice-frequency.schema';

export type EnsembleDocument = Ensemble & Document;

@Schema()
export class Ensemble {
  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  link: string;

  @Prop()
  address: string;

  @Prop()
  activeMusicians: number;

  @Prop()
  practiceFrequency: PracticeFrequency;

  @Prop()
  genre: Genre;
}

export const EnsembleSchema = SchemaFactory.createForClass(Ensemble);
