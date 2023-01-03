import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { EnsembleService } from './../src/services/ensemble.service';
import { TestModule } from './../src/test.module';
import { CreateEnsembleDto } from './../src/dto/create-ensemble.dto';

describe('Ensemble Controller (e2e)', () => {
  let app: INestApplication;
  let enService: EnsembleService;

  // Deletes all ensmembles from the db before running the tests
  beforeEach(async () => {
    await enService.deleteAll({});
  });

  // Before running all the tests, it creates the test db
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TestModule],
    }).compile();

    enService = moduleFixture.get(EnsembleService);
    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  // Testing the Get all Ensembles method
  // describe('Get all Ensemble Controller', () => {
  //   it('should get all ensembles', async () => {
  //     //Act
  //     const result = await request(app.getHttpServer())
  //       .get('/ensembles')
  //       .expect(200)
  //       .expect({
  //         data: enService.findAll(),
  //       });

  //     //Assert
  //     expect(result.body);
  //   });
  // });

  // Testing the Post an Ensemble method
  describe('POST Ensemble Controller', () => {
    it('should create a new valid ensemble', async () => {
      // Arrange
      const en = new CreateEnsembleDto(
        'Addams Family Orchestra',
        'This is a description',
        'www.addams.org',
        'New York',
        22,
        'every two days',
        'Baroq',
      );

      // Act
      const result = await request(app.getHttpServer())
        .post('/ensembles')
        .send(en)
        .expect(201);

      // Assert
      const res = result.body;
      expect(res._id).toBeDefined();
      expect(res.__v).toEqual(0);
    });

    it('should create a new valid ensemble', async () => {
      // Arrange
      const en2 = new CreateEnsembleDto(
        '',
        'This is a description',
        'www.addams.org',
        'New York',
        22,
        'every two days',
        'Baroq',
      );

      // Act
      const result = await request(app.getHttpServer())
        .post('/ensembles')
        .send(en2)
        .expect(400);

      // Assert
      expect(result.body.message[0]).toEqual('name should not be empty');
    });

    it('should create a new valid ensemble', async () => {
      // Arrange
      const en3 = new CreateEnsembleDto(
        'The Addams Family Orchetsra',
        '',
        'www.addams.org',
        'New York',
        22,
        'every two days',
        'Baroq',
      );

      // Act
      const result = await request(app.getHttpServer())
        .post('/ensembles')
        .send(en3)
        .expect(400);

      // Assert
      expect(result.body.message[0]).toEqual('description should not be empty');
    });
  });

  // Closing the app after all tests, which results in not hanging.
  afterAll(() => {
    app.close();
  });
});
