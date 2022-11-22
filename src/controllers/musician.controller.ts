import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Musician } from 'src/schemas/musician.schema';
import { MusicianService } from 'src/services/musician.service';
import { CreateMusicianDto } from 'src/dto/create-musician.dto';
import { UpdateMusicianDto } from 'src/dto/update-musician.dto';
import { Ensemble } from 'src/schemas/ensemble.schema';
import { UpdateEnsembleDto } from 'src/dto/update-ensemble.dto';
import { CreateEnsembleDto } from 'src/dto/create-ensemble.dto';

@Controller('musicians')
export class MusicianController {
  constructor(private readonly musicianService: MusicianService) {}

  @Get()
  getAllMusicians(): Promise<Musician[]> {
    return this.musicianService.findAll();
  }

  @Post()
  create(@Body() CreateMusicianDto: CreateMusicianDto) {
    return this.musicianService.create(CreateMusicianDto);
  }

  @Put(':id')
  updateMusician(
    @Param('id') id: string,
    @Body() updateMusicianDto: UpdateMusicianDto,
  ) {
    return this.musicianService.updateMusician(id, updateMusicianDto);
  }

  @Delete(':id')
  deleteMusician(@Param('id') id: string) {
    return this.musicianService.deleteMusician(id);
  }

  // @Get('/ensembles')
  // findAllEnsembles(): Promise<Musician[]> {
  //   return this.musicianService.findAllEnsembles();
  // }

  @Post('/:id/ensembles')
  findAllTest(@Param('id') id: string, @Body() ensemble: CreateEnsembleDto) {
    return this.musicianService.findAllTest(id, ensemble);
  }
}
