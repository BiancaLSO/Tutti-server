import { Controller, Get } from '@nestjs/common';
import { Musician } from 'src/schemas/musician.schema';
import { MusicianService } from 'src/services/musician.service';

@Controller('musicians')
export class MusicianController {
  constructor(private readonly musicianService: MusicianService) {}

  @Get()
  getAllMusicians(): Promise<Musician[]> {
    return this.musicianService.findAll();
  }
}
