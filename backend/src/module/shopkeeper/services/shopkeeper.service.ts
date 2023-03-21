import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from '@prisma/client';
import { PrismaService } from '~/module/prisma/prisma.service';

@Injectable()
export class ShopkeeperService {
  constructor(
    private prismaService: PrismaService,
    private jwtService: JwtService,
  ) {}

  async findOne(email: string) {
    return await this.prismaService.shopkeeper.findUnique({ where: { email } });
  }

  async findStore(authorization, cnpj: string) {
    const [_, token] = authorization.split(' ');
    const shopkeeperTokenDecoded = this.jwtService.decode(token);
    const shopkeeperId = shopkeeperTokenDecoded['id'];

    return await this.prismaService.store.findFirst({
      where: { shopkeeperIdFk: shopkeeperId, cnpj },
    });
  }

  async createShopkeeper({
    name,
    email,
    phone,
    password,
  }: Prisma.ShopkeeperCreateInput) {
    return await this.prismaService.shopkeeper.create({
      data: {
        name,
        email,
        phone,
        password,
      },
    });
  }
}
