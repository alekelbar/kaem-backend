import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Topic, topicSchema } from './schemas/topic.schema';
import { Subject, SubjectSchema } from 'src/subjects/schemas/subject.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Topic.name, schema: topicSchema }]),
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
  ],
  controllers: [TopicsController],
  providers: [TopicsService],
})
export class TopicsModule { }
