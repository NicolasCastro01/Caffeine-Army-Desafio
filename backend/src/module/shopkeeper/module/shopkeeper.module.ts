import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'module/prisma';
import { ShopkeeperService } from '../services';

@Module({
  providers: [ShopkeeperService, PrismaService, JwtService],
})
export class ShopkeeperModule {}
