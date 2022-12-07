import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Ensemble } from './../schemas/ensemble.schema';
import { EnsembleService } from './../services/ensemble.service';
import { CreateEnsembleDto } from './../dto/create-ensemble.dto';
import { UpdateEnsembleDto } from './../dto/update-ensemble.dto';

@Controller('ensembles')
export class EnsembleController {
  constructor(private readonly ensembleService: EnsembleService) {}

  @Get()
  getAllEnsemble(): Promise<Ensemble[]> {
    return this.ensembleService.getAllEnsembles();
  }

  @Get('filter')
  getFilteredEnsembles(@Query('search') keyword: string) {
    return this.ensembleService.getFilteredEnsembles(keyword);
  }

  @Post()
  createEnsembles(@Body() CreateEnsembleDto: CreateEnsembleDto) {
    return this.ensembleService.createEnsemble(CreateEnsembleDto);
  }

  @Put(':id')
  updateEnsemble(
    @Param('id') id: string,
    @Body() updateEnsembleDto: UpdateEnsembleDto,
  ) {
    return this.ensembleService.updateEnsemble(id, updateEnsembleDto);
  }

  @Delete(':id')
  deleteEnsemble(@Param('id') id: string) {
    return this.ensembleService.deleteEnsemble(id);
  }
}
