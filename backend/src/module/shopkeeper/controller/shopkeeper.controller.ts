import { BadRequestException } from '@nestjs/common';
import { Controller, Get, UseGuards, Query, Headers } from '@nestjs/common';
import { JwtAuthGuard } from '~/auth/jwt-auth.guard';
import { ShopkeeperService } from '../services';

@Controller('api/v1/shopkeeper')
export class ShopkeeperController {
  constructor(private shopkeeperService: ShopkeeperService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/store')
  async getStores(
    @Query('cnpj') cnpj: string,
    @Headers('Authorization') authorization: string,
  ) {
    try {
      return await this.shopkeeperService.findStore(authorization, cnpj);
    } catch (error) {
      throw new BadRequestException();
    }
  }
}
