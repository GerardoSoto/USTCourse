import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {ProjectSchema } from './Schema/project.schema'
import { AppServiceDB } from './AppDB.service';
import { LoggerMiddleware } from './Middleware/loggerMiddleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'projectdb'}),
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
