import { Global, Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Product } from './entities/product.entity';
import { Profile } from './entities/profile.entity';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { ProfilesModule } from './profiles/profiles.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from "dotenv"
import { UsersService } from './users/users.service';
import { LocalStrategy } from './strategies/local.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseLogging } from './inteceptors/response-logging.interceptor';
import { jwtConfig } from './config/jwt.config';
import { HttpExceptionFilter } from './exceptions/http-filter.exception';
import { dbDataSource } from './db/data-source';
dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forRoot(dbDataSource),
    TypeOrmModule.forFeature([User, Product, Profile]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    UsersModule,
    ProductsModule,
    ProfilesModule,
    AuthModule,
    JwtModule.registerAsync(jwtConfig),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get("THROTTLE_TTL") as number,
          limit: config.get("THROTTLE_LIMIT") as number 
        }
      ]
      
    })
  ],
  controllers: [AppController],
  providers: [AppService,LocalStrategy,UsersService,
    {provide: APP_GUARD,useClass: ThrottlerGuard}, 
    {provide: APP_INTERCEPTOR,useClass: ResponseLogging},
    {provide: APP_FILTER, useClass: HttpExceptionFilter}],
})
export class AppModule {}



