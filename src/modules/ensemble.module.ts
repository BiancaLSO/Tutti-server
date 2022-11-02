import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Ensemble, EnsembleSchema } from 'src/schemas/ensemble.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ensemble.name, schema: EnsembleSchema },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class EnsembleModule {}
