import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
 
  private projects : IProject[] = [];

  constructor() {

      this.projects = [
      {
      id: 1,
      name: "Johnson - Kutch",
      description: "Fully-configurable intermediate framework. Ullam occaecati libero laudantium nihil voluptas omnis qui modi qui.",
      imageUrl: "/assets/placeimg_500_300_arch4.jpg",
      contractTypeId: 3,
      contractSignedOn: new Date("2013-08-04T22:39:41.473Z"),
      budget: 54637,
      isActive: false
    },
    {
      id: 2,
      name: "Dillesik LLCs",
      description: "Re-contextualized dynamic moratorium. Aut nulla soluta numquam qui dolor architecto et facere dolores.",
      imageUrl: "/assets/placeimg_500_300_arch12.jpg",
      contractTypeId: 6,
      contractSignedOn: new Date("2016-06-26T18:24:01.706Z"),
      budget: 29729,
      isActive: true
    },
    {
      id: 3,
      name: "Purdy, Keeling and Smithams",
      description: "Innovative 6th generation model. Perferendis libero qui iusto et ullam cum sint molestias vel.",
      imageUrl: "/assets/placeimg_500_300_arch5.jpg",
      contractTypeId: 4,
      contractSignedOn: new Date("2013-05-26T01:10:42.344Z"),
      budget: 45660,
      isActive: true
    }
    ]
    
  }

  getHello(): string {
    return 'Hello World!';
  }

  getProjects(): IProject[]{
    return this.projects;
  }

  addProject(project: IProject): string{
    this.projects.push(project);
    return "project added";
  }
}
