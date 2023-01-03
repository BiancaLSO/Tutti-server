import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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
  practiceFrequency: string;

  @Prop()
  genre: string;
  
}

export const EnsembleSchema = SchemaFactory.createForClass(Ensemble);
