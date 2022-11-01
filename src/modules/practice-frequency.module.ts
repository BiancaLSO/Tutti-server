import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PracticeFrequency, PracticeFrequencySchema } from 'src/schemas/practice-frequency.schema';
import { PracticeFrequencyService } from 'src/services/practice-frequency.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: PracticeFrequency.name, schema: PracticeFrequencySchema }])],
  controllers: [],
  providers: [PracticeFrequencyService],
})
export class PracticeFrequencyModule {}