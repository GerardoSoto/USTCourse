import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProjectDto } from './DTO/CreateProjectDto';
import Project from './Model/Project';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('projects')
  getProjects(): IProject[] {
    console.log(this.appService.getProjects());
    return this.appService.getProjects();
  }

  @Post('project')
  //@HttpCode(200)
  async create(@Res() response, @Body() createProjectDto: CreateProjectDto) {
    //console.log(createProjectDto);
    try {
      let project = new Project(
        createProjectDto.name,
        createProjectDto.description,
        '/assets/placeimg_500_300_arch4.jpg',
        1,
        createProjectDto.budget,
        createProjectDto.isActive,
      );

      this.appService.addProject(project);

      response.status(HttpStatus.CREATED).json({
        message: 'New Project Added',
        project,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Student not created!',
        error: 'Bad Request',
      });
    }

    //return 'New Project Crated';
  }
}
