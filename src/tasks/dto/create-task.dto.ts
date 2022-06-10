import { Transform, Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  date: Date = new Date();

  @Transform((value) => +value.value)
  @IsNotEmpty()
  @IsNumber()
  sequence: number;
}
