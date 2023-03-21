import { Body, Controller, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { AuthService } from '~/auth/auth.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() shopkeeper: Prisma.ShopkeeperCreateInput) {
    return await this.authService.login(shopkeeper);
  }

  @Post('/register')
  async register(@Body() shopkeeper: Prisma.ShopkeeperCreateInput) {
    return await this.authService.register(shopkeeper);
  }
}
