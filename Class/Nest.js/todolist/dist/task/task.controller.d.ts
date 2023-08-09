import { Task } from './task.model';
import { TaskService } from './task.service';
export declare class TaskController {
    private readonly taskService;
    constructor(taskService: TaskService);
    getAllTasks(): {
        tasks: Task[];
    };
    createTask(title: string): Task;
    getTaskById(id: string): Task;
    updateTask(id: string, completed: boolean): Task;
    deleteTask(id: string): void;
}
