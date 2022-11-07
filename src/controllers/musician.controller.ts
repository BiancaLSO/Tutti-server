import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Musician } from 'src/schemas/musician.schema';
import { MusicianService } from 'src/services/musician.service';
import { CreateMusicianDto } from 'src/dto/create-musician.dto';

@Controller('musicians')
export class MusicianController {
  constructor(private readonly musicianService: MusicianService) {}

  @Get()
  getAllMusicians(): Promise<Musician[]> {
    return this.musicianService.findAll();
  }

  @Post()
  async create(@Body() CreateMusicianDto: CreateMusicianDto) {
    await this.musicianService.create(CreateMusicianDto);
  }

  @Put(':id')
  async updateMusician(@Param('id') id: string, @Body() musician: Musician) {
    return this.musicianService.updateMusician(id, musician);
  }
}
