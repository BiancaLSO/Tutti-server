import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { UserService } from './../src/services/user.service';
import { TestModule } from './../src/test.module';
import { CreateUserDto } from './../src/dto/create-user.dto';
import mongoose from 'mongoose';

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
      const user = new CreateUserDto(
        'Jane',
        'Doe',
        'jane.doe@example.com',
        'password123',
      );

      // Act
      const result = await request(app.getHttpServer())
        .post('/users')
        .send(user)
        .expect(201);

      // Assert
      const res = result.body;
      expect(res._id).toBeDefined();
      expect(res.__v).toEqual(0);
    });

    it('should return an error if the email is already taken', async () => {
      // Arrange
      const user1 = new CreateUserDto(
        'Jane',
        'Doe',
        'jane.doe@example.com',
        'password123',
      );
      const user2 = new CreateUserDto(
        'John',
        'Doe',
        'jane.doe@example.com',
        'password456',
      );

      // Act
      await request(app.getHttpServer())
        .post('/users')
        .send(user1)
        .expect(201);
      const result = await request(app.getHttpServer())
        .post('/users')
        .send(user2)
        .expect(400);

      // Assert
      expect(result.body.message).toEqual('Email already taken');
    });

    it('should return an error if the password is too short', async () => {
      // Arrange
      const user = new CreateUserDto(
        'Jane',
        'Doe',
        'jane.doe@example.com',
        'pass',
        );

        // Act
        const result = await request(app.getHttpServer())
          .post('/users')
          .send(user)
          .expect(400);
  
        // Assert
        expect(result.body.message).toEqual('Password must be at least 5 characters long with at least one number');
      });
    });
  
    // Closing the app after all tests, which results in not hanging.
    afterAll(() => {
      app.close();
    });
  });

  
  