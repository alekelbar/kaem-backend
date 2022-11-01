import { Module } from '@nestjs/common';
import { SubjetsService } from './subjets.service';
import { SubjetsController } from './subjets.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Subject, SubjectSchema } from './schemas/subject.schema';
import { User, UserSchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Subject.name, schema: SubjectSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [SubjetsController],
  providers: [SubjetsService],
})
export class SubjetsModule {}
