import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { jwtConstants } from '~/config';
import { ShopkeeperService } from '~/module/shopkeeper/services/shopkeeper.service';

@Injectable()
export class AuthService {
  constructor(
    private shopkeeperService: ShopkeeperService,
    private jwtService: JwtService,
  ) {}

  async validateShopkeeper({
    email,
    password,
  }: Prisma.ShopkeeperCreateInput): Promise<any> {
    const shopkeeper = await this.shopkeeperService.findOne(email);
    const hasShopkeeper = !!shopkeeper;

    if (!hasShopkeeper) {
      return false;
    }

    const shopkeeperPasswordIsEqual = await bcrypt.compare(
      password,
      shopkeeper.password,
    );

    if (shopkeeper && shopkeeperPasswordIsEqual) {
      const { password, ...result } = shopkeeper;

      return result;
    }

    return null;
  }

  async login({ email, password }: Prisma.ShopkeeperCreateInput) {
    const shopkeeperData = await this.validateShopkeeper({ email, password });
    const hasShopkeeper = !!shopkeeperData;

    if (!hasShopkeeper) {
      return { msg: 'Shopkeeper no exists.' };
    }

    return {
      shopkeeper: shopkeeperData,
      access_token: this.jwtService.sign(
        { ...shopkeeperData },
        {
          expiresIn: '10d',
          secret: jwtConstants.secret,
        },
      ),
    };
  }

  async register(shopkeeper: Prisma.ShopkeeperCreateInput) {
    const { name, email, phone } = shopkeeper;
    const shopkepperPasswordHashed = await bcrypt.hash(shopkeeper.password, 10);

    const { password, ...result } =
      await this.shopkeeperService.createShopkeeper({
        name,
        email,
        phone,
        password: shopkepperPasswordHashed,
      });

    return result;
  }
}
