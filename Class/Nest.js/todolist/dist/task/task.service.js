"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskService = void 0;
const common_1 = require("@nestjs/common");
let TaskService = exports.TaskService = class TaskService {
    constructor() {
        this.tasks = [];
    }
    getAllTasks() {
        return this.tasks;
    }
    createTask(title) {
        const task = {
            id: Date.now().toString(),
            title,
            completed: false,
        };
        this.tasks.push(task);
        return task;
    }
    getTaskById(id) {
        return this.tasks.find((task) => task.id === id);
    }
    updateTask(id, completed) {
        const task = this.getTaskById(id);
        if (task) {
            task.completed = completed;
        }
        return task;
    }
    deleteTask(id) {
        this.tasks = this.tasks.filter((task) => task.id !== id);
    }
};
exports.TaskService = TaskService = __decorate([
    (0, common_1.Injectable)()
], TaskService);
//# sourceMappingURL=task.service.js.map