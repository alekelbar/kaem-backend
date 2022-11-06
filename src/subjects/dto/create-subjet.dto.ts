import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// TODO: make better validations

export class CreateSubjetDto {
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
