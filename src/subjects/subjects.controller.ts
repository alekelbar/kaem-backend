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
import { SubjectsService } from './subjects.service';
import { CreateSubjetDto } from './dto/create-subjet.dto';
import { UpdateSubjetDto } from './dto/update-subjet.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { get } from 'http';

@ApiTags('subjects')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjetsService: SubjectsService) { }

  @ApiResponse({
    status: 201,
    description: 'The record has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Subject invalid.' })
  @Post()
  create(@Body() createSubjetDto: CreateSubjetDto) {
    return this.subjetsService.create(createSubjetDto);
  }

  @ApiResponse({ status: 200, description: 'Successfuly.' })
  @Get()
  findAll(@Query('user') user_id: string) {
    return this.subjetsService.findAll(user_id);
  }

  @ApiResponse({ status: 400, description: 'Subject invalid.' })
  @Get('/one/:id')
  findOne(@Param('id') id: string) {
    return this.subjetsService.findOne(id);
  }

  @ApiResponse({ status: 400, description: 'Subject invalid.' })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubjetDto: UpdateSubjetDto) {
    return this.subjetsService.update(id, updateSubjetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subjetsService.remove(id);
  }
}
