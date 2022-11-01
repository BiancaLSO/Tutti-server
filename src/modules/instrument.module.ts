import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Instrument, InstrumentSchema } from 'src/schemas/instrument.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Instrument.name, schema: InstrumentSchema }])],
  controllers: [],
  providers: [],
})
export class InstrumentModule {}