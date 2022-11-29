// import { Test, TestingModule } from '@nestjs/testing';
// import { MusicianService } from '.././services/musician.service';
// import { MusicianController } from '.././controllers/musician.controller';

// describe('MusiciansController', () => {
//   let controller: MusicianController;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [{
//         provide: MusicianService,
//         useValue: {},
//       }],
//       controllers: [MusicianController],
//     }).compile();

//     controller = module.get<MusicianController>(MusicianController);
//   });

//   it('should be defined', () => {
//     expect(controller).toBeDefined();
//   });
// });

// describe('musicianController', () => {
//     let musiciansController: MusicianController;
//     let musiciansService: MusicianService;
//     const result = ['test'];
//     beforeEach(async () => {
//       const moduleRef = await Test.createTestingModule({
//           controllers: [MusicianController],
//           providers: [{
//             provide: MusicianService,
//             useValue: {
//                 findAll: jest.fn().mockResolvedValue(result)
//             },
//           }],
//         }).compile();

//       musiciansService = moduleRef.get<MusicianService>(MusicianService);
//       musiciansController = moduleRef.get<MusicianController>(MusicianController);
//     });

//     describe('findAll', () => {
//       it('should return an array of musicians', async () => {
//         const result = ['test'];
//         musiciansService.findAll = jest.fn().mockResolvedValue(result);

//         expect(await musiciansController.getAllMusicians()).toBe(result);
//       });
//     });
//   });
