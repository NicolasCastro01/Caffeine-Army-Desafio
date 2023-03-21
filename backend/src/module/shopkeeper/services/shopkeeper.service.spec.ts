import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '~/module/prisma/prisma.service';
import { ShopkeeperService } from './shopkeeper.service';

describe('ShopkeeperService', () => {
  let service: ShopkeeperService;
  let prismaService: PrismaService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ShopkeeperService,
        {
          provide: PrismaService,
          useValue: {
            shopkeeper: {
              findUnique: jest.fn(),
              create: jest.fn(),
            },
            store: {
              findFirst: jest.fn(),
            },
          },
        },
        {
          provide: JwtService,
          useValue: {
            decode: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ShopkeeperService>(ShopkeeperService);
    prismaService = module.get<PrismaService>(PrismaService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(prismaService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a shopkeeper', async () => {
      prismaService.shopkeeper.findUnique = jest.fn().mockReturnValueOnce({});
      const shopkeeper = await service.findOne('nicolas@email.com');
      expect(shopkeeper).toEqual({});
    });
  });

  describe('findStore', () => {
    it('should return a shopkeeper', async () => {
      jwtService.decode = jest.fn().mockReturnValueOnce({ id: '' });
      prismaService.store.findFirst = jest.fn().mockReturnValueOnce({});
      const shopkeeper = await service.findStore(
        'bearer token',
        '04.646.343/0001-89',
      );
      expect(shopkeeper).toEqual({});
    });
  });

  describe('create', () => {
    it('should return a new shopkeeper', async () => {
      prismaService.shopkeeper.create = jest
        .fn()
        .mockReturnValueOnce({ data: {} });
      const newShopkeeper = await service.createShopkeeper({
        name: '',
        email: '',
        phone: '',
        password: '',
      });
      expect(newShopkeeper).toEqual({ data: {} });
    });
  });
});
