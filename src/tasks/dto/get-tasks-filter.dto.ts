import { TaskStatus } from './create-task.dto';

export class GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
