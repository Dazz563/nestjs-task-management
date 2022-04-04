import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto, TaskStatus } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { v4 as uuid } from 'uuid';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: CreateTaskDto[] = [];

  getAllTasks() {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): CreateTaskDto[] {
    const { status, search } = filterDto;

    // Define temporary array to hold the result
    let tasks = this.getAllTasks();

    // Do something with status if defined
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    // Do something with search if ddefined
    if (search) {
      tasks = tasks.filter((task) => {
        if (task.title.includes(search) || task.description.includes(search)) {
          return true;
        }
        return false;
      });
    }

    return tasks;
  }

  getTaskById(id: string): CreateTaskDto {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): CreateTaskDto {
    const { title, description } = createTaskDto;

    const task: CreateTaskDto = {
      id: uuid(),
      title,
      description,
      created_at: new Date(),
      updated_at: new Date(),
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  updateTaskStatus(id: string, status: TaskStatus) {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
