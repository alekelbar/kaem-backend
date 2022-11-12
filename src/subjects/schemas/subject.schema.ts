import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from './user.schema';

export type SubjectDocument = Subject & Document;

@Schema()
export class Subject {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true })
  user_id: User;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  descr: string;

  @Prop({ required: true })
  startAt: string;

  @Prop({ required: true })
  endAt: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
