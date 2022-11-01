import { PartialType } from '@nestjs/swagger';
import { CreateTopicDto } from './create-topic.dto';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateTopicDto extends PartialType(CreateTopicDto) {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  subjectId: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  descr: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  deadline: string;

  @IsNotEmpty()
  @ApiProperty()
  important: [string];

  @IsNotEmpty()
  @ApiProperty()
  urgent: [string];
}
