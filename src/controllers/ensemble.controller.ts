
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
  } from '@nestjs/common';
  import { Ensemble } from 'src/schemas/ensemble.schema';
  import { EnsembleService } from 'src/services/ensemble.service';
  import { CreateEnsembleDto } from 'src/dto/create-ensemble.dto';
import { UpdateEnsembleDto } from 'src/dto/update-ensemble.dto';


  
@Controller('ensembles')
export class EnsembleController {
  constructor(private readonly ensembleService: EnsembleService) {}

  @Get()
  getAllEnsemble(): Promise<Ensemble[]> {
    return this.ensembleService.findAll();
  }

  @Post()
  create(@Body() CreateEnsembleDto: CreateEnsembleDto) {
    return this.ensembleService.create(CreateEnsembleDto);
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