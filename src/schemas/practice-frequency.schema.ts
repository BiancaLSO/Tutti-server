import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PracticeFrequencyDocument = PracticeFrequency & Document;

@Schema()
export class PracticeFrequency {
  @Prop()
  frequency: string;

}

export const PracticeFrequencySchema = SchemaFactory.createForClass(PracticeFrequency);