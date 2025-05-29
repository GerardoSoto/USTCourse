import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Res, ValidationPipe} from '@nestjs/common';
//import { AppService } from './app.service';
import { CreateProjectDto } from './DTO/CreateProjectDto';
import { UpdateProjectDto } from './DTO/UpdateProjectDto';
import Project from './Model/Project';
import { AppServiceDB } from './AppDB.service';

@Controller('api')
export class AppController {
  constructor(private readonly appService: AppServiceDB) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('projects')
  async getProjects(@Res() response) {
    try {
      const projects = await this.appService.getProjects();

      return response.status(HttpStatus.OK).json({
        message: 'All projects data found successfully',
        projects,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }


  @Get('projects/:id')
  async getProject(@Res() response, @Param('id') projectId) {
    try {
      const project = await this.appService.getProjectById(projectId);
      //if (project) {
        return response.status(HttpStatus.OK).json({
          message: 'Project found successfully',
          project,
        });
      // }
      // else{
      //   return response.status(HttpStatus.NOT_FOUND).json({
      //     statusCode: 404,
      //     message: 'Error: Project not found!',
      //     error: 'Bad Request',
        // });
      // }
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Post('project')
  //@HttpCode(200)
  async create(@Res() response, @Body() createProjectDto: CreateProjectDto) {
    try {
      let project = new Project(
        createProjectDto.name.trim(),
        createProjectDto.description,
        '/assets/placeimg_500_300_arch4.jpg',
        1,
        createProjectDto.budget,
        createProjectDto.isActive,
      );

      const newProject = await this.appService.createProject(project);

      response.status(HttpStatus.CREATED).json({
        message: 'Project has been created successfully',
        newProject,
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
  async updateProject(@Res() response, @Param('id') projectId, @Body() updatedProjectDto: UpdateProjectDto) {
    try {
      const existingProject = await this.appService.updateProject(projectId, updatedProjectDto);

     // if (existingProject) {
        return response.status(HttpStatus.OK).json({
          message: 'Project has been successfully updated',
          existingProject,
        });
      // } else {
      //   return response.status(HttpStatus.BAD_REQUEST).json({
      //     statusCode: 400,
      //     message: 'Error: Project not updated!',
      //     error: 'Bad Request',
      //   });
      // }
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('projects/:id')
  async deleteProject(@Res() response, @Param('id') projectId){
    try{
      const projectDeleted = await this.appService.deleteProject(projectId);

      //if(projectDeleted){
        return response.status(HttpStatus.OK).json({
                message: 'Project deleted successfully',
                projectDeleted,
            });
      // }
      // else{
      //    return response.status(HttpStatus.NOT_FOUND).json({
      //     statusCode: 404,
      //     message: 'Error: Project not found!',
      //     error: 'Bad Request',
      //   });
      // }

    }
    catch(err){
      return response.status(err.status).json(err.response);
    }
  }
}
