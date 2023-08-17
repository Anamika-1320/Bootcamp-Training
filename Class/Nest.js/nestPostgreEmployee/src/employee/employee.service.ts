/* eslint-disable prettier/prettier */
// src/employee/employee.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async create(employeeData: Employee): Promise<Employee> {
    const employee = this.employeeRepository.create(employeeData);
    return this.employeeRepository.save(employee);
  }

  async update(id: number, employeeData: Employee): Promise<Employee | undefined> {
    await this.employeeRepository.update(id, employeeData);
    return this.employeeRepository.findOne({ where: {id } });
  }

  async delete(id: number): Promise<void> {
    await this.employeeRepository.delete(id);
  }
}
