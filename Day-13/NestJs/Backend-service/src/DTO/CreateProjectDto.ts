import { IsNotEmpty, IsNumber, IsString, MaxLength } from "@nestjs/class-validator";


export class CreateProjectDto{
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
   name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  budget: number;

  isActive: boolean;
}