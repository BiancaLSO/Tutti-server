import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UserService } from './../src/services/user.service';
import { TestModule } from './../src/test.module';
import { CreateUserDto } from './../src/dto/create-user.dto';
import { CreateEnsembleDto } from './../src/dto/create-ensemble.dto';

describe('User Controller (e2e)', () => {
  let app: INestApplication;
  let userService: UserService;

  // Deletes all users from the db before running the tests
  beforeEach(async () => {
    await userService.deleteAll({});
  });

  // Before running all the tests, it creates the test db
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    userService = moduleFixture.get(UserService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  // Testing the Post a User method
  describe('POST User Controller', () => {
    it('should create a new valid user', async () => {
      // Arrange
      const ensemble1 = new CreateEnsembleDto(
        'Addams Family Orchestra',
        'This is a description',
        'www.addams.org',
        'New York',
        22,
        'every two days',
        'Baroq',
      );
      const user = new CreateUserDto(
        'John',
        'johndoe@gmail.com',
        'password',
        'John Doe',
        12345678,
        'Guitar',
        'I am a professional guitar player',
        [ensemble1],
      );

      // Act
      const result = await request(app.getHttpServer())
        .post('/profile/signup')
        .send(user)
        .expect(201);

      // Assert
      const res = result.body;
      expect(res._id).toBeDefined();
      expect(res.__v).toEqual(0);
    });

    it('should return an error for an empty username', async () => {
      // Arrange
      const ensemble1 = new CreateEnsembleDto(
        'Addams Family Orchestra',
        'This is a description',
        'www.addams.org',
        'New York',
        22,
        'every two days',
        'Baroq',
      );
      const user1 = new CreateUserDto(
        '',
        'johndoe@gmail.com',
        'password',
        'John Doe',
        12345678,
        'Guitar',
        'I am a professional guitar player',
        [ensemble1],
      );

      // Act
      const result = await request(app.getHttpServer())
        .post('/profile/signup')
        .send(user1)
        .expect(400);

      // Assert
      expect(result.body.message[0]).toEqual('username should not be empty');
    });

    it('should return an error for an empty password', async () => {
      // Arrange
      const ensemble1 = new CreateEnsembleDto(
        'Addams Family Orchestra',
        'This is a description',
        'www.addams.org',
        'New York',
        22,
        'every two days',
        'Baroq',
      );
      const user3 = new CreateUserDto(
        'John',
        'johndoe@gmail.com',
        '',
        'John Doe',
        12345678,
        'Guitar',
        'I am a professional guitar player',
        [ensemble1],
      );

      // Act
      const result = await request(app.getHttpServer())
        .post('/profile/signup')
        .send(user3)
        .expect(400);

      // Assert
      expect(result.body.message[0]).toEqual('password should not be empty');
    });

    // it('should return an error for an empty email', async () => {
    //   // Arrange
    //   const ensemble1 = new CreateEnsembleDto(
    //     'Addams Family Orchestra',
    //     'This is a description',
    //     'www.addams.org',
    //     'New York',
    //     22,
    //     'every two days',
    //     'Baroq',
    //   );
    //   const user2 = new CreateUserDto(
    //     'John',
    //     '',
    //     'password',
    //     'John Doe',
    //     12345678,
    //     'Guitar',
    //     'I am a professional guitar player',
    //     [ensemble1],
    //   );

    //   // Act
    //   const result = await request(app.getHttpServer)
    //     .post('/profile/signup')
    //     .send(user2)
    //     .expect(400);

    //   // Assert
    //   expect(result.body.message[0]).toEqual('email should not be empty');
    // });
  });

  // Closing the app after all tests, which results in not hanging.
  afterAll(() => {
    app.close();
  });
});
