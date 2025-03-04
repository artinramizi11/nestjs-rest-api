import { Module } from '@nestjs/common';
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
dotenv.config()

@Module({
  imports: [
    TypeOrmModule.forRoot(connectDb),
    TypeOrmModule.forFeature([User, Product, Profile]),
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
  providers: [AppService],
})
export class AppModule {}


