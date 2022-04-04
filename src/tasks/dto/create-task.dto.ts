import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  id: string;
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  description: string;
  created_at: Date;
  updated_at: Date;
  status: TaskStatus;
}

export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
