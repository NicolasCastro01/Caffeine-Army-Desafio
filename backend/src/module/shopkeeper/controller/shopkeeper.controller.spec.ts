import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { ShopkeeperService } from '../services';
import { ShopkeeperController } from './shopkeeper.controller';

describe('ShopkeeperController', () => {
  let controller: ShopkeeperController;
  let service: ShopkeeperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ShopkeeperController],
      providers: [
        {
          provide: ShopkeeperService,
          useValue: {
            findStore: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ShopkeeperController>(ShopkeeperController);
    service = module.get<ShopkeeperService>(ShopkeeperService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('getStores', () => {
    it('should return a store associeted with shopkeeper authenticated', async () => {
      service.findStore = jest.fn().mockReturnValueOnce({});
      const store = await controller.getStores('', '');
      expect(store).toEqual({});
    });

    it('should return a bad request error', async () => {
      service.findStore = jest.fn().mockRejectedValueOnce(BadRequestException);
      const promise = controller.getStores('', '');
      await expect(promise).rejects.toThrow(BadRequestException);
    });
  });
});
