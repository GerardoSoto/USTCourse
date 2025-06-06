import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ThrottlerModule.forRoot(),
    MongooseModule.forRoot(
      process.env.DATABASE_URI ??
        (() => {
          throw new Error('DATABASE_URI is not defined');
        })(),
      {
        dbName: process.env.DATABASE_NAME,
        auth: {
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASS,
        },
      },
    ),

    // feature module
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
