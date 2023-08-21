import { Body, Controller, Delete, Get, HttpCode, Logger, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateEventDto } from './input/create-event.dto';
import { UpdateEventDto } from './input/update-event.dto';
import { Equal, MoreThan, Repository } from 'typeorm';
import { InjectRepository } from "@nestjs/typeorm";
import { Attendee } from 'src/events/attendee.entity';
import { Event } from 'src/events/event.entity';
import { EventsService } from './events.service';
import { ListEvents } from './input/list.events';

@Controller('/events')
export class EventsController {
    private readonly logger = new Logger(EventsController.name);

    constructor(
        @InjectRepository(Event)
        private readonly repository: Repository<Event>,

        @InjectRepository(Attendee)
        private readonly attendeeRepository: Repository<Attendee>,

        private readonly eventsService: EventsService
    ) { }

    @Get()
    @UsePipes(new ValidationPipe({ transform: true }))
    async findAll(@Query() filter: ListEvents) {
        const events = await this.eventsService.getEventsWithAttendeeCountFilteredPaginated(filter, {
            total: true,
            currentPage: filter.page,
            limit: 3
        });
        return events;
    }

    @Get('/practice')
    async practice() {
        return await this.repository.find({
            select: ['id', 'when'],
            where: { id: MoreThan(3) },
            // take: 2,
            // skip: 1,
            order: {
                id: 'ASC'
            }
        });
    }

    @Get('/practice2')
    async practice2() {
        // return await this.repository.findOne({ where: { id: Equal(1) }, loadEagerRelations: false });
        // return await this.repository.findOne({ where: { id: Equal(1) }, relations: ['attendees'] });

        // const event = await this.repository.findOne({ where: { id: Equal(1) } });
        // const attendee = new Attendee();
        // attendee.name = 'Jerry';
        // attendee.event = event;
        // await this.attendeeRepository.save(attendee);
        // return event;

        const event = await this.repository.findOne({ where: { id: Equal(1) }, relations: ['attendees'] });
        const attendee = new Attendee();
        attendee.name = 'Using Cascade';
        event.attendees.push(attendee)
        await this.repository.save(event);
        return event;
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const event = await this.eventsService.getEvent(id);
        if (!event) {
            throw new NotFoundException();
        }
        return event;
    }

    @Post()
    async create(@Body() input: CreateEventDto) {
        return await this.repository.save({
            ...input,
            when: new Date(input.when),
        });
    }

    @Patch(':id')
    async update(@Param('id') id, @Body() input: UpdateEventDto) {
        const event = await this.repository.findOne({ where: { id: Equal(id) } });
        if (!event) {
            throw new NotFoundException();
        }
        return await this.repository.save({
            ...event,
            ...input,
            when: input.when ? new Date(input.when) : event.when
        });
    }

    @Delete(':id')
    @HttpCode(204)
    async remove(@Param('id') id) {
        // this.events = this.events.filter(event => event.id !== parseInt(id));
        // const event = await this.repository.findOne({ where: { id: Equal(id) } });
        const result = await this.eventsService.deleteEvent(id);
        if (result?.affected !== 1) {
            throw new NotFoundException();
        }
    }
}