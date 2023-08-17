import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
export declare class EmployeeService {
    private readonly employeeRepository;
    constructor(employeeRepository: Repository<Employee>);
    findAll(): Promise<Employee[]>;
    create(employeeData: Employee): Promise<Employee>;
    update(id: number, employeeData: Employee): Promise<Employee | undefined>;
    delete(id: number): Promise<void>;
}
