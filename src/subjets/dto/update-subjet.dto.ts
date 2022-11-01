import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjetDto } from './create-subjet.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateSubjetDto extends PartialType(CreateSubjetDto) {
  @IsNotEmpty()
  @ApiProperty()
  user_id: string;

  @IsNotEmpty()
  @ApiProperty()
  title: string;

  @IsNotEmpty()
  @ApiProperty()
  descr: string;

  @IsNotEmpty()
  @ApiProperty()
  startAt: string;

  @IsNotEmpty()
  @ApiProperty()
  endAt: string;
}
