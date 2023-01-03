import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
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
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('ensembles')
export class EnsembleController {
  constructor(private readonly ensembleService: EnsembleService) {}

  @Get()
  getAllEnsemble(): Promise<Ensemble[]> {
    try {
      return this.ensembleService.getAllEnsembles();
    } catch (error) {
      console.error(error);
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('by/:id')
  getEnsemblesById(@Param('id') id: string) {
    try {
      return this.ensembleService.getEnsembleById(id);
    } catch (error) {
      console.error(error);
      // Handle the error
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get('filter')
  getFilteredEnsembles(@Query('search') keyword: string) {
    return this.ensembleService.getFilteredEnsembles(keyword);
  }

  @Post()
  createEnsemble(@Body() CreateEnsembleDto: CreateEnsembleDto) {
    try {
      return this.ensembleService.createEnsemble(CreateEnsembleDto);
    } catch (error) {
      console.error(error);
      throw new HttpException('Validation Error', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateEnsemble(
    @Param('id') id: string,
    @Body() updateEnsembleDto: UpdateEnsembleDto,
  ) {
    try {
      return this.ensembleService.updateEnsemble(id, updateEnsembleDto);
    } catch (error) {
      console.error(error);
      throw new HttpException('Validation Error', HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteEnsemble(@Param('id') id: string) {
    try {
      return this.ensembleService.deleteEnsemble(id);
    } catch (error) {
      console.error(error);
      throw new HttpException('Validation Error', HttpStatus.BAD_REQUEST);
    }
  }
}
