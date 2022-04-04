import { TaskStatus } from './create-task.dto';
import { IsEnum } from 'class-validator';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
