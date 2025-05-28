import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res, ValidationPipe} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateProjectDto } from './DTO/CreateProjectDto';
import { UpdateProjectDto } from './DTO/UpdateProjectDto';
import Project from './Model/Project';
import { validate, validateOrReject } from '@nestjs/class-validator';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
d
  @Get('projects')
  getProjects(@Res() response): IProject[] {
    try {
      const projects = this.appService.getProjects();

      return response.status(HttpStatus.OK).json({
        message: 'All projects data found successfully',
        projects,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }


  @Get('projects/:id')
  getProject(@Res() response, @Param('id') projectId) {
    try {
      const project = this.appService.getProjectById(projectId);
      if (project) {
        return response.status(HttpStatus.OK).json({
          message: 'Project found successfully',
          project,
        });
      }
      else{
        return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: 404,
          message: 'Error: Project not found!',
          error: 'Bad Request',
        });
      }
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('project')
  //@HttpCode(200)
  async create(@Res() response, @Body(new ValidationPipe()) createProjectDto: CreateProjectDto) {
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
        message: 'Error: Project not created!',
        error: 'Bad Request',
      });
    }
  }

  @Put('projects/:id')
  async updateProject(@Res() response, @Param('id') projectId, @Body(new ValidationPipe()) updatedProjectDto: UpdateProjectDto) {
    try {
      const existingProject = await this.appService.updateProject(
        projectId,
        updatedProjectDto,
      );

      if (existingProject) {
        return response.status(HttpStatus.OK).json({
          message: 'Project has been successfully updated',
          existingProject,
        });
      } else {
        return response.status(HttpStatus.BAD_REQUEST).json({
          statusCode: 400,
          message: 'Error: Project not updated!',
          error: 'Bad Request',
        });
      }
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('projects/:id')
  async deleteProject(@Res() response, @Param('id') projectId){
    try{
      const projectDeleted = this.appService.deleteProject(projectId);

      if(projectDeleted){
        return response.status(HttpStatus.OK).json({
                message: 'Project deleted successfully',
                projectDeleted,
            });
      }
      else{
         return response.status(HttpStatus.NOT_FOUND).json({
          statusCode: 404,
          message: 'Error: Project not found!',
          error: 'Bad Request',
        });
      }

    }
    catch(err){
      return response.status(err.status).json(err.response);
    }
  }
}
