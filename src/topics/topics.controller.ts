import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TopicsService } from './topics.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';

@Controller('topics')
export class TopicsController {
  constructor(private readonly topicsService: TopicsService) { }

  @Post()
  create(@Body() createTopicDto: CreateTopicDto) {
    return this.topicsService.create(createTopicDto);
  }

  @Post('/complete/:id')
  complete(@Param('id') id: string) {
    return this.topicsService.complete(id);
  }

  @Post('/uncomplete/:id')
  uncomplete(@Param('id') id: string) {
    return this.topicsService.uncomplete(id);
  }

  @Get()
  findAll(@Query('user') user_id: string) {
    return this.topicsService.findAll(user_id);
  }

  @Get('one/:id')
  findOne(@Param('id') id: string) {
    return this.topicsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicDto: UpdateTopicDto) {
    return this.topicsService.update(id, updateTopicDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicsService.remove(id);
  }
}
