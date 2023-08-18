import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsController } from './events.controller';
import { Event } from 'src/events/event.entity';
import { Attendee } from 'src/events/attendee.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Event, Attendee])],
    controllers: [EventsController]
})
export class EventsModule { }
