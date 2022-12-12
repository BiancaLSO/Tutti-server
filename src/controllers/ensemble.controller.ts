import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Ensemble } from './../schemas/ensemble.schema';
import { EnsembleService } from './../services/ensemble.service';
import { CreateEnsembleDto } from './../dto/create-ensemble.dto';
import { UpdateEnsembleDto } from './../dto/update-ensemble.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('ensembles')
export class EnsembleController {
  constructor(private readonly ensembleService: EnsembleService) {}

  @Get()
  getAllEnsemble(): Promise<Ensemble[]> {
    return this.ensembleService.getAllEnsembles();
  }

  @UseGuards(JwtAuthGuard)
  @Get('by/:id')
  getEnsemblesById(@Param('id') id: string) {
    return this.ensembleService.getEnsembleById(id);
  }

  @Get('filter')
  getFilteredEnsembles(@Query('search') keyword: string) {
    return this.ensembleService.getFilteredEnsembles(keyword);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  createEnsembles(@Body() CreateEnsembleDto: CreateEnsembleDto) {
    return this.ensembleService.createEnsemble(CreateEnsembleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateEnsemble(
    @Param('id') id: string,
    @Body() updateEnsembleDto: UpdateEnsembleDto,
  ) {
    return this.ensembleService.updateEnsemble(id, updateEnsembleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteEnsemble(@Param('id') id: string) {
    return this.ensembleService.deleteEnsemble(id);
  }
}
