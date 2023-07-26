import { IsInt, IsPositive, MinLength, Min, IsString } from 'class-validator';

export class CreateValiantDto {
  @IsInt()
  @IsPositive()
  @Min(1)
  number: number;

  @IsString()
  @MinLength(1)
  name: string;
}
