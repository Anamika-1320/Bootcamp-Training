/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Render,
} from '@nestjs/common';
import { Task } from './task.model';
import { TaskService } from './task.service';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Get()
  @Render('tasks')
  getAllTasks(): { tasks: Task[] } {
    const tasks = this.taskService.getAllTasks();
    return { tasks };
  }

  @Post()
  createTask(@Body('title') title: string): Task {
    return this.taskService.createTask(title);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string): Task {
    return this.taskService.getTaskById(id);
  }

  @Put(':id')
  updateTask(
    @Param('id') id: string,
    @Body('completed') completed: boolean,
  ): Task {
    return this.taskService.updateTask(id, completed);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    this.taskService.deleteTask(id);
  }
}
