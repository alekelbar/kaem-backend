import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Subject } from 'src/subjects/schemas/subject.schema';
import { User } from '../../subjects/schemas/user.schema';

export type TopicDocument = Topic & Document;
const importantValues: string[] = ['importante', 'no importante'];
const urgentValues: string[] = ['urgente', 'no urgente'];

@Schema()
export class Topic {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'subjecs' })
  subjectId: Subject;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true })
  user_id: User;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  descr: string;

  @Prop({ required: true })
  deadline: string;

  @Prop({ required: true, default: false })
  complete: boolean;

  @Prop({ required: true, enum: importantValues })
  important: string;

  @Prop({ required: true, enum: urgentValues })
  urgent: string;
}

export const TopicSchema = SchemaFactory.createForClass(Topic);
