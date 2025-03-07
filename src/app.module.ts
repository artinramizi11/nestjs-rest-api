import { Module} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { connectDb } from './connectDb';
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
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forRoot(connectDb),
    TypeOrmModule.forFeature([User, Product, Profile]),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration]
    }),
    UsersModule,
    ProductsModule,
    ProfilesModule,
    AuthModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: {expiresIn:"1h"}
      
    })
  ],
  controllers: [AppController],
  providers: [AppService,LocalStrategy,UsersService],
})
export class AppModule {}



