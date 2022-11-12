import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Subject, SubjectDocument } from 'src/subjects/schemas/subject.schema';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic, TopicDocument } from './schemas/topic.schema';

@Injectable()
export class TopicsService {
  constructor(
    @InjectModel(Topic.name) private topicModel: Model<TopicDocument>,
    @InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>,
  ) { }

  async create(createTopicDto: CreateTopicDto) {
    const { subjectId } = createTopicDto;

    if (!mongoose.Types.ObjectId.isValid(subjectId))
      throw new HttpException('Invalid subject', HttpStatus.BAD_REQUEST);

    const subject = await this.subjectModel.findById(subjectId);
    if (!subject)
      throw new HttpException('subject does not exist', HttpStatus.BAD_REQUEST);

    try {
      return await this.topicModel.create(createTopicDto);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Database service Error ' + error,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async complete(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException('Invalid Topic', HttpStatus.BAD_REQUEST);

    const topic = await this.topicModel.findById(id);
    if (!topic)
      throw new HttpException('Topic does not exist', HttpStatus.BAD_REQUEST);


    return await this.topicModel.findOneAndUpdate({ _id: id }, { complete: true }, {
      new: true,
    });
  }

  async uncomplete(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException('Invalid Topic', HttpStatus.BAD_REQUEST);

    const topic = await this.topicModel.findById(id);
    if (!topic)
      throw new HttpException('Topic does not exist', HttpStatus.BAD_REQUEST);


    return await this.topicModel.findOneAndUpdate({ _id: id }, { complete: false }, {
      new: true,
    });
  }

  findAll(user_id: string) {
    return this.topicModel.find({ user_id });
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException('Invalid Topic', HttpStatus.BAD_REQUEST);

    const topic = await this.topicModel.findById(id);
    if (!topic)
      throw new HttpException('Topic does not exist', HttpStatus.BAD_REQUEST);

    return topic;
  }

  async update(id: string, updateTopicDto: UpdateTopicDto) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException('Invalid Topic', HttpStatus.BAD_REQUEST);

    const topic = await this.topicModel.findById(id);
    if (!topic)
      throw new HttpException('Topic does not exist', HttpStatus.BAD_REQUEST);

    return await this.topicModel.findOneAndUpdate({ _id: id }, updateTopicDto, {
      new: true,
    });
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException('Invalid Topic', HttpStatus.BAD_REQUEST);

    const topic = await this.topicModel.findById(id);
    if (!topic)
      throw new HttpException('Topic does not exist', HttpStatus.BAD_REQUEST);

    return await this.topicModel.findOneAndDelete({ _id: id });
  }
}
