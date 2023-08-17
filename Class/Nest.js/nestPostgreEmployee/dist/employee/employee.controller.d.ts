import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
export declare class EmployeeController {
    private readonly employeeService;
    constructor(employeeService: EmployeeService);
    findAll(): Promise<Employee[]>;
    create(employeeData: Employee): Promise<Employee>;
    update(id: number, employeeData: Employee): Promise<Employee>;
    delete(id: number): Promise<void>;
}
