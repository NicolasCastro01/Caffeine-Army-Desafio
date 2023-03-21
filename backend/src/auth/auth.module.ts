import { Module } from '@nestjs/common';
import { ShopkeeperModule } from 'module/shopkeeper/module/shopkeeper.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { ShopkeeperService } from 'module/shopkeeper/services';
import { PrismaService } from 'module/prisma';
import { jwtConstants } from '~/config/constants';

@Module({
  imports: [
    ShopkeeperModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '10d' },
    }),
  ],
  providers: [
    AuthService,
    ShopkeeperService,
    LocalStrategy,
    JwtStrategy,
    PrismaService,
    JwtService,
  ],
})
export class AuthModule {}
