import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

// deleteOne(id: number) {
//   return from (this.appService.delete(id));
// }

// function deleteOne(id: any, number: any) {
//   throw new Error('Function not implemented.');
// }
