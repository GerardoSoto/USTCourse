import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {ProjectSchema } from './Schema/project.schema'
import { AppServiceDB } from './AppDB.service';
import { LoggerMiddleware } from './Middleware/loggerMiddleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
        ACCESS_TOKEN_SECRET: Joi.string().required(),
        ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
        REFRESH_TOKEN_SECRET: Joi.string().required(),
        REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
    }),
    MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'projectdb'}),
    MongooseModule.forFeature([{name: 'Project', schema: ProjectSchema}]),
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService, AppServiceDB],
})
export class AppModule implements NestModule
{
  configure(consumer: MiddlewareConsumer) {
      consumer
      .apply(LoggerMiddleware)
      .forRoutes('api');
  }
}
