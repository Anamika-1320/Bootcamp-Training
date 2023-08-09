import { Task } from './task.model';
export declare class TaskService {
    private tasks;
    getAllTasks(): Task[];
    createTask(title: string): Task;
    getTaskById(id: string): Task;
    updateTask(id: string, completed: boolean): Task;
    deleteTask(id: string): void;
}
