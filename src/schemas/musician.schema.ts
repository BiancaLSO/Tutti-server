import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Instrument } from './instrument.schema';

export type MusicianDocument = Musician & Document;

@Schema()
export class Musician {
  @Prop()
  fullName: string;

  @Prop()
  phoneNo: number;

  @Prop()
  instruments: Instrument[];

  @Prop()
  description: string;

//   @Prop()
//   ensembles: Ensemble[];

//   @Prop()
//   posts: Post[];

}


export const MusicianSchema = SchemaFactory.createForClass(Musician);