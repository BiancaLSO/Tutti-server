import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnsembleController } from './../controllers/ensemble.controller';
import { Ensemble, EnsembleSchema } from './../schemas/ensemble.schema';
import { EnsembleService } from './../services/ensemble.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Ensemble.name, schema: EnsembleSchema },
    ]),
  ],
  controllers: [EnsembleController],
  providers: [EnsembleService],
})
export class EnsembleModule {}
