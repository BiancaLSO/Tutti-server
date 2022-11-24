import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Musician } from '.././schemas/musician.schema';
import { MusicianService } from '.././services/musician.service';
import { CreateMusicianDto } from '.././dto/create-musician.dto';
import { UpdateMusicianDto } from '.././dto/update-musician.dto';
import { CreateEnsembleDto } from 'src/dto/create-ensemble.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('musicians')
export class MusicianController {
  constructor(private readonly musicianService: MusicianService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getAllMusicians(): Promise<Musician[]> {
    return this.musicianService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() CreateMusicianDto: CreateMusicianDto) {
    return this.musicianService.create(CreateMusicianDto);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  updateMusician(
    @Param('id') id: string,
    @Body() updateMusicianDto: UpdateMusicianDto,
  ) {
    return this.musicianService.updateMusician(id, updateMusicianDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteMusician(@Param('id') id: string) {
    return this.musicianService.deleteMusician(id);
  }

  @Post(':id/ensembles')
  addEnsemble(
    @Param('id') id: string,
    @Body() ensemble: CreateEnsembleDto,
  ): Promise<Musician> {
    console.log('ensemble', ensemble);
    console.log('ensemble id', id);

    return this.musicianService.addEnsemble(id, ensemble);
  }

  @Delete(':id/ensembles/:enId')
  deleteEnsemble(
    @Param('id') id: string,
    @Param('enId') enId: string,
  ): Promise<Musician> {
    console.log('businessCardId', enId);
    console.log('business id', id);

    return this.musicianService.deleteEnsemble(id, enId);
  }
}
