import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { EnsembleController } from 'src/controllers/ensemble.controller';
import { Ensemble, EnsembleSchema } from 'src/schemas/ensemble.schema';
import { EnsembleService } from 'src/services/ensemble.service';

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
