import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Musician } from '.././schemas/musician.schema';
import { MusicianService } from '.././services/musician.service';
import { CreateMusicianDto } from '.././dto/create-musician.dto';
import { UpdateMusicianDto } from '.././dto/update-musician.dto';

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
}
