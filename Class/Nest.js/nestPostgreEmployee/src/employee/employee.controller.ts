/* eslint-disable prettier/prettier */
import { Controller, Get,  Post, Put, Delete, Body, Param, Patch } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';

@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async findAll() {
    return this.employeeService.findAll();
  }

  @Post()
  async create(@Body() employeeData: Employee) {
    return this.employeeService.create(employeeData);
  }

  // @Put(':id')
  // async update(@Param('id') id: number, @Body() employeeData: Employee) {
  //   return this.employeeService.update(id, employeeData);
  // }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() employeeData: Employee) {
    return this.employeeService.update(id, employeeData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.employeeService.delete(id);
  }
}
