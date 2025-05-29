import { Injectable, NotFoundException } from '@nestjs/common';
import { UpdateProjectDto } from './DTO/UpdateProjectDto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AppServiceDB {

  constructor(@InjectModel('Project') private projectModel: Model<IProject>) {
  }

  getHello(): string {
    return 'Hello World!';
  }

  async getProjectById(projectId: string): Promise<IProject> {

    const project = await this.projectModel.findById(projectId).exec();

    if (!project) {
      throw new NotFoundException(`Student #${projectId} not found`);
    }
    return project;
  }

  async getProjects(): Promise<IProject[]> {
    const projectsData = await this.projectModel.find();

    if (!projectsData || projectsData.length == 0) {
      throw new NotFoundException('Projects data not found!');
    }

    return projectsData;
  }

  async createProject(project: IProject): Promise<IProject> {
    const newProject = await new this.projectModel(project);

    return newProject.save();
  }

  async updateProject(
    projectId: string,
    updatedProject: UpdateProjectDto,
  ): Promise<IProject> {
    const currentProject = await this.projectModel.findByIdAndUpdate(
      projectId,
      updatedProject,
      { new: true },
    );

    if (!currentProject) {
      throw new NotFoundException(`Project #${projectId} not found`);
    }

    return currentProject;
  }

  async deleteProject(projectId: string): Promise<IProject> {
    const deletedProject = await this.projectModel.findByIdAndDelete(projectId);

    if (!deletedProject) {
      throw new NotFoundException(`Project #${projectId} not found`);
    }

    return deletedProject;
  }
}
