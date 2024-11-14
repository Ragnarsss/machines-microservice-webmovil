import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMachineDto {
  @IsString()
  @IsNotEmpty()
  model: string;

  @IsString()
  @IsNotEmpty()
  manufacturer: string;

  @IsString()
  @IsNotEmpty()
  plaque: string;
}
