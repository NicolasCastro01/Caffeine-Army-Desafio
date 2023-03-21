import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '~/auth/auth.service';
import { AppService } from '../services';
import { AppController } from './app.controller';

describe('AppController', () => {
  let controller: AppController;
  let authService: AuthService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: AuthService,
          useValue: {
            login: jest.fn(),
            register: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = app.get<AppController>(AppController);
    authService = app.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return the shopkeeper and your access_token', async () => {
      authService.login = jest
        .fn()
        .mockReturnValueOnce({ shopkeeper: {}, access_token: '' });
      const authShopkeeper = await controller.login({
        email: '',
        password: '',
      });
      expect(authShopkeeper).toEqual({ shopkeeper: {}, access_token: '' });
    });
  });

  describe('register', () => {
    it('should return the shopkeeper', async () => {
      authService.register = jest.fn().mockReturnValueOnce({
        id: '',
        name: '',
        email: '',
        phone: '',
        createdAt: '',
      });
      const authShopkeeper = await controller.register({
        email: '',
        password: '',
      });
      expect(authShopkeeper).toEqual({
        id: '',
        name: '',
        email: '',
        phone: '',
        createdAt: '',
      });
    });
  });
});
