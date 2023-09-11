import { Body, Controller, Delete, ForbiddenException, Get, HttpCode, Logger, NotFoundException, Param, ParseIntPipe, Patch, Post, Query, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateEventDto } from './input/create-event.dto';
import { UpdateEventDto } from './input/update-event.dto';
import { EventsService } from './events.service';
import { ListEvents } from './input/list.events';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuardJwt } from 'src/auth/auth-guard.jwt';

@Controller('/events')
export class EventsController {
    private readonly logger = new Logger(EventsController.name);

    constructor(
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

    // @Get('/practice')
    // async practice() {
    //     return await this.repository.find({
    //         select: ['id', 'when'],
    //         where: { id: MoreThan(3) },
    // take: 2,
    // skip: 1,
    //         order: {
    //             id: 'ASC'
    //         }
    //     });
    // }

    // @Get('/practice2')
    // async practice2() {
    // return await this.repository.findOne({ where: { id: Equal(1) }, loadEagerRelations: false });
    // return await this.repository.findOne({ where: { id: Equal(1) }, relations: ['attendees'] });
    // 
    // const event = await this.repository.findOne({ where: { id: Equal(1) } });
    // const attendee = new Attendee();
    // attendee.name = 'Jerry';
    // attendee.event = event;
    // await this.attendeeRepository.save(attendee);
    // return event;
    // 
    //     const event = await this.repository.findOne({ where: { id: Equal(1) }, relations: ['attendees'] });
    //     const attendee = new Attendee();
    //     attendee.name = 'Using Cascade';
    //     event.attendees.push(attendee)
    //     await this.repository.save(event);
    //     return event;
    // }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        const event = await this.eventsService.getEvent(id);
        if (!event) {
            throw new NotFoundException();
        }
        return event;
    }

    @Post()
    @UseGuards(AuthGuardJwt)
    async create(@Body() input: CreateEventDto, @CurrentUser() user: User) {
        return await this.eventsService.createEvent(input, user);
    }

    @Patch(':id')
    @UseGuards(AuthGuardJwt)
    async update(@Param('id') id, @Body() input: UpdateEventDto, @CurrentUser() user: User) {
        const event = await this.eventsService.getEvent(id);
        if (!event) {
            throw new NotFoundException();
        }

        if (event.organizerId !== user.id) {
            throw new ForbiddenException(null, `You are not authorized to change this event.`);
        }
        return await this.eventsService.updateEvent(input, event);
    }

    @Delete(':id')
    @UseGuards(AuthGuardJwt)
    @HttpCode(204)
    async remove(@Param('id') id, @CurrentUser() user: User) {
        const event = await this.eventsService.getEvent(id);
        if (!event) {
            throw new NotFoundException();
        }

        if (event.organizerId !== user.id) {
            throw new ForbiddenException(null, `You are not authorized to delete this event.`);
        }
        await this.eventsService.deleteEvent(id);
    }
}