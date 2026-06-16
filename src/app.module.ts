import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FoodsModule } from './foods/foods.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth/auth.module';
import { AuthService } from './auth/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'skl12',
      database: 'food_loop',
      autoLoadEntities: true,
      synchronize: true,
    }),
    FoodsModule,
    UsersModule,
    AuthModule,
    CategoriesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AuthService, JwtService],
})  
export class AppModule {}