import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}

// DeleteOne 
@Delete(':id')
deleteOne(@Param(':id')id: number): {
  return this.appService.deleteOne(id);
}

function deleteOne() {
  throw new Error('Function not implemented.');
}
