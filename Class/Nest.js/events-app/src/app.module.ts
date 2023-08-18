import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppJapanService } from './app.japan.service';
import { AppDummy } from './app.dummy';
import ormConfig from './config/orm.config'
import ormConfigProd from './config/orm.config.prod'
import { EventsModule } from './events/events.module';
import { SchoolModule } from './school/school.module';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true, load: [ormConfig], expandVariables: true }),
  TypeOrmModule.forRootAsync({ useFactory: process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd }),
    EventsModule,
    SchoolModule],
  controllers: [AppController],
  providers: [{ provide: AppService, useClass: AppService },     // class injection
  { provide: 'APP_NAME', useValue: 'Nest Events Backend!' },          // value injection
  { provide: 'MESSAGE', inject: [AppDummy], useFactory: (app) => `${app.dummy()} Factory!` }, // factory provider
    AppDummy]
})
export class AppModule { }
