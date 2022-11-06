import { Controller, Post, Body } from "@nestjs/common";
import { CreateMusicianDto } from "src/dto/create-musician.dto";
import { MusicianService } from 'src/services/musician.service';


@Controller("create-musician")
export class CreateMusicianController {
  constructor(private readonly MusicianService: MusicianService) {}

  @Post()
  async create(@Body() CreateMusicianDto: CreateMusicianDto) {
    await this.MusicianService.create(CreateMusicianDto);
  }
}