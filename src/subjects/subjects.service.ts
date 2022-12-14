import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Subject } from 'rxjs';
import { CreateSubjetDto } from './dto/create-subjet.dto';
import { UpdateSubjetDto } from './dto/update-subjet.dto';
import { User, UserDocument } from './schemas/user.schema';
import { Topic, TopicDocument } from '../topics/schemas/topic.schema';

@Injectable()
export class SubjectsService {
  constructor(
    @InjectModel(Subject.name) private subjectModel: Model<UserDocument>,
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectModel(Topic.name) private TopicModel: Model<TopicDocument>,
  ) { }

  async create(createSubjetDto: CreateSubjetDto) {
    const { user_id } = createSubjetDto;

    if (!mongoose.Types.ObjectId.isValid(user_id)) {
      throw new HttpException('Invalid User ID', HttpStatus.BAD_REQUEST);
    }

    const userExist = await this.UserModel.find({ _id: user_id });

    if (!userExist)
      throw new HttpException('user not found', HttpStatus.BAD_REQUEST);

    return await this.subjectModel.create(createSubjetDto);
  }

  async findAll(user_id: string) {
    return await this.subjectModel.find({ user_id });
  }

  async findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(parseInt(id)))
      throw new HttpException('Invalid subject ID', HttpStatus.BAD_REQUEST);

    const sujectExist = await this.subjectModel.findById(id);
    if (!sujectExist)
      throw new HttpException('subject does not exist', HttpStatus.BAD_REQUEST);

    return sujectExist;
  }

  async update(id: string, updateSubjetDto: UpdateSubjetDto) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException('Invalid subject ID', HttpStatus.BAD_REQUEST);

    const sujectExist = await this.subjectModel.findById(id);

    if (!sujectExist)
      throw new HttpException('subject does not exist', HttpStatus.BAD_REQUEST);

    return await this.subjectModel.findOneAndUpdate(
      { _id: id },
      updateSubjetDto,
      {
        new: true,
      },
    );
  }

  async remove(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new HttpException('Invalid subject ID', HttpStatus.BAD_REQUEST);

    const sujectExist = await this.subjectModel.findById(id);

    if (!sujectExist)
      throw new HttpException('subject does not exist', HttpStatus.BAD_REQUEST);

    const del = await this.subjectModel.findOneAndDelete({ _id: id });
    if (!del) {
      throw new HttpException('Internal error, cannot delete it', HttpStatus.BAD_REQUEST);
    }

    try {
      return await this.TopicModel.deleteMany({ subjectId: id });
    } catch (error) {
      return error;
    }

  }
}
