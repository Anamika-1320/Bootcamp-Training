import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { getEnvPath } from './common/helper/env.helper';
import { TypeOrmConfigService } from './shared/typeorm/typeorm.service'
import { ApiModule } from './api/api.module';
import { ControllerController } from './src/api/controller/controller.controller';
import { ControllerController } from './api/controller/controller.controller';
import { UserController } from './api/user/user.controller';
import { UserService } from './api/user/user.service';
import { UserModule } from './api/user/user.module';

const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath, isGlobal: true }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ApiModule,
    UserModule,
  ],
  controllers: [AppController, ControllerController, UserController],
  providers: [AppService, UserService],
})

export class AppModule { }

