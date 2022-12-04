import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './../src/services/user.service';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { UserModule } from './../src/modules/user.module';
import { AppModule } from './../src/app.module';
import { User } from 'src/schemas/user.schema';
import { CreateUserDto } from './../src/dto/create-user.dto';

describe('Users', () => {
  let app: INestApplication;
  let userService = { findAll: () => [] };
``
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(UserService)
      .useValue(userService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET users`, () => {
    return request(app.getHttpServer())
      .get('/profile')
      .expect(200)
      .expect({
        data: userService.findAll(),
      });
  });

  afterAll( () => {
     app.close();
  });
});


