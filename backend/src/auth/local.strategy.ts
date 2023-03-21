import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate({ email, password }: Prisma.ShopkeeperCreateInput) {
    const shopkeeper = await this.authService.validateShopkeeper({
      email,
      password,
    });

    if (!shopkeeper) {
      throw new UnauthorizedException();
    }

    return shopkeeper;
  }
}
