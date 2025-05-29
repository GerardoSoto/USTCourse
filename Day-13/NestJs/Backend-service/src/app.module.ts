import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import {ProjectSchema } from './Schema/project.schema'
import { AppServiceDB } from './AppDB.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017',{dbName: 'projectdb'}),
    MongooseModule.forFeature([{name: 'Project', schema: ProjectSchema}])
  ],
  controllers: [AppController],
  providers: [AppService, AppServiceDB],
})
export class AppModule {}
