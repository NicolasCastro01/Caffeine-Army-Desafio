import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { ShopkeeperService } from '~/module/shopkeeper/services';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;
  let shopkeeperService: ShopkeeperService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ShopkeeperService,
          useValue: {
            findOne: jest.fn(),
            createShopkeeper: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    shopkeeperService = module.get<ShopkeeperService>(ShopkeeperService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(shopkeeperService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('validateShopkeeper', () => {
    it('should return shopkeeper credentials', async () => {
      shopkeeperService.findOne = jest
        .fn()
        .mockReturnValueOnce({ name: '', email: '', password: '' });
      jest.spyOn(bcrypt, 'compare').mockImplementation((pass, salt) => true);
      const result = await service.validateShopkeeper({
        email: '',
        password: '',
      });
      expect(result).toEqual({ name: '', email: '' });
    });

    it('should return false when shopkeeper not exists', async () => {
      shopkeeperService.findOne = jest.fn().mockReturnValueOnce(false);
      const result = await service.validateShopkeeper({
        email: '',
        password: '',
      });
      expect(result).toBeFalsy();
    });

    it('should return null when shopkeeper password is not equal', async () => {
      shopkeeperService.findOne = jest.fn().mockReturnValueOnce({});
      jest.spyOn(bcrypt, 'compare').mockImplementation((pass, salt) => false);
      const result = await service.validateShopkeeper({
        email: '',
        password: '',
      });
      expect(result).toBeNull();
    });
  });

  describe('login', () => {
    it('should return shopkeeper and your access_token object', async () => {
      jwtService.sign = jest.fn().mockReturnValueOnce('');
      service.validateShopkeeper = jest
        .fn()
        .mockReturnValueOnce({ id: '', name: '', email: '' });
      const response = await service.login({ email: '', password: '' });
      expect(response).toEqual({
        shopkeeper: { id: '', name: '', email: '' },
        access_token: '',
      });
    });

    it('should return shopkeeper no exists object message', async () => {
      service.validateShopkeeper = jest.fn().mockReturnValueOnce(false);
      const response = await service.login({ email: '', password: '' });
      expect(response).toEqual({ msg: 'Shopkeeper no exists.' });
    });
  });

  describe('register', () => {
    it('should return new shopkeeper credentials', async () => {
      jest.spyOn(bcrypt, 'hash').mockImplementation((pass, salt) => '');
      shopkeeperService.createShopkeeper = jest.fn().mockReturnValueOnce({});

      const newShopkeeper = await service.register({
        name: '',
        email: '',
        phone: '',
        password: '',
      });
      expect(newShopkeeper).toEqual({});
    });
  });
});
