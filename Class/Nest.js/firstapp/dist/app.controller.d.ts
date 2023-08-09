import { Request } from 'express';
import { AppService } from './app.service';
import { CreateEmpDto } from './create-emp.dto';
export declare class AppController {
    private readonly appService;
    constructor(appService: AppService);
    getHello(): string;
    getEmp(request: Request): string;
    create(createEmp: CreateEmpDto): string;
    findOne(id: string): string;
}
