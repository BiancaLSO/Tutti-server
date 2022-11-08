import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  fullName: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: number;

  @Prop({ required: true })
  confimrPassword: string;

  @Prop({ required: true })
  isMusician: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
