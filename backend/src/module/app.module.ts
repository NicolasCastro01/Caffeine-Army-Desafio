import { Module } from '@nestjs/common';
import { ShopkeeperModule } from './shopkeeper/module/shopkeeper.module';
import { AuthModule } from '../auth/auth.module';
import { AuthService } from 'auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { AppController } from './app/controller';
import { ShopkeeperController } from './shopkeeper/controller';
import { AppService } from './app/services';
import { PrismaService } from './prisma';
import { ShopkeeperService } from './shopkeeper/services';

@Module({
  imports: [ShopkeeperModule, AuthModule],
  controllers: [AppController, ShopkeeperController],
  providers: [
    AppService,
    PrismaService,
    AuthService,
    ShopkeeperService,
    JwtService,
  ],
})
export class AppModule {}
