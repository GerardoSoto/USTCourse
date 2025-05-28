import { PartialType } from "@nestjs/mapped-types";
import { CreateProjectDto } from "./CreateProjectDto";

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}