import { IsNotEmpty, IsNumber, IsString, MaxLength, Validate } from "@nestjs/class-validator";
import { GreaterThanZero, IsNotBlank } from "src/CustomValidations/CustomValidations";


export class CreateProjectDto{
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  @Validate(IsNotBlank, {
    message: 'name should not be blank!',
  })
   name: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsNotBlank, {
    message: 'description should not be blank!',
  })
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Validate(GreaterThanZero, {
    message: "number must be greater than zero"
  })
  budget: number;

  isActive: boolean;
}