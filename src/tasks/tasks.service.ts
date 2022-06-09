import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
    const { status, search } = filterDto;
    let tasks = this.getAllTasks();
    //search method
    if (search) {
      tasks = tasks.filter((task) => {
        if (
          task.title.toLowerCase().includes(search) ||
          task.description.toLowerCase().includes(search)
        ) {
          return true;
        }
        return false;
      });
    }
    //status method
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }
    // return result
    return tasks;
  }

  getTaskById(id: string): Task {
    //try to get task
    //if note throw error404
    //therwise return found
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException('Task is not found');
    }
    return found;
  }

  createTask(CreateTaskDto: CreateTaskDto): Task {
    const { title, description, date, sequence /*, tags*/ } = CreateTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      date,
      sequence,
      //tags,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id);
    this.tasks = this.tasks.filter((task) => task.id !== found.id); //not best practice
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id);
    task.status = status;
    return task;
  }
}
