import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Subject } from 'src/subjects/schemas/subject.schema';

export type topicDocument = Topic & Document;
const importantValues: string[] = ['importante', 'no importante'];
const urgentValues: string[] = ['urgente', 'no urgente'];

@Schema()
export class Topic {
  @Prop({ required: true, type: mongoose.Types.ObjectId, ref: 'subjecs' })
  subjectId: Subject;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  descr: string;

  @Prop({ required: true, type: Date })
  deadline: string;

  @Prop({ required: true, enum: importantValues })
  important: string;

  @Prop({ required: true, enum: urgentValues })
  urgent: string;
}

export const topicSchema = SchemaFactory.createForClass(Topic);
