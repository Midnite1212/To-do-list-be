import { Transform, Type } from 'class-transformer';
import {
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { TaskStatus } from '../task.model';

export class UpdateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Transform((value) => +value.value)
  sequence: number;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  date: Date = new Date();

  @IsEnum(TaskStatus)
  status: TaskStatus;
}
