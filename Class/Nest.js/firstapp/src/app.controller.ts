import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { CreateEmpDto } from './create-emp.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/emp')
  getEmp(@Req() request: Request): string {
    console.log(`GET request by ${request.path}`);
    return this.appService.getEmp();
  }

  @Post('/add-emp')
  create(@Body() createEmp: CreateEmpDto) {
    return 'This action adds a new employee';
  }
}
