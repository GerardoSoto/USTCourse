import { stringify } from "querystring";

export class CreateProjectDto{
  name: string;
  description: string;
  budget: number;
  isActive: boolean;
}