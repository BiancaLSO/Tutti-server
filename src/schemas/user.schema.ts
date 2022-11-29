import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Ensemble } from './ensemble.schema';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  username: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  fullName: string;

  @Prop()
  phoneNo: number;

  @Prop()
  instrument: string;

  @Prop()
  description: string;

  @Prop()
  ensembles: Ensemble[];
}

export const UserSchema = SchemaFactory.createForClass(User);
