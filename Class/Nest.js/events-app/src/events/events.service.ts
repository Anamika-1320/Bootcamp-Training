import { InjectRepository } from "@nestjs/typeorm";
import { Event } from 'src/events/event.entity';
import { Attendee, AttendeeAnswerEnum } from 'src/events/attendee.entity';
import { DeleteResult, Repository } from "typeorm";
import { Injectable, Logger } from "@nestjs/common";
import { ListEvents, WhenEventFilter } from './input/list.events';
import { PaginateOptions, paginate } from '../pagination/paginator';
import { CreateEventDto } from "./input/create-event.dto";
import { User } from "src/auth/user.entity";
import { UpdateEventDto } from "./input/update-event.dto";

@Injectable()
export class EventsService {

    private readonly logger = new Logger(EventsService.name);

    constructor(
        @InjectRepository(Event)
        private readonly eventsRepository: Repository<Event>,

        @InjectRepository(Attendee)
        private readonly attendeeRepository: Repository<Attendee>
    ) { }

    private getEventsBaseQuery() {
        return this.eventsRepository.createQueryBuilder('e')
            .orderBy('e.id', 'DESC')
    }

    public getEventsWithAttendeeCountQuery() {
        return this.getEventsBaseQuery()
            .loadRelationCountAndMap('e.attendeeCount', 'e.attendees')
            .loadRelationCountAndMap('e.attendeeAccepted', 'e.attendees', 'attendee',
                (qb) => qb.where('attendee.answer = :answer', { answer: AttendeeAnswerEnum.Accepted }))
            .loadRelationCountAndMap('e.attendeeMaybe', 'e.attendees', 'attendee',
                (qb) => qb.where('attendee.answer = :answer', { answer: AttendeeAnswerEnum.Maybe }))
            .loadRelationCountAndMap('e.attendeeRejected', 'e.attendees', 'attendee',
                (qb) => qb.where('attendee.answer = :answer', { answer: AttendeeAnswerEnum.Rejected }))
    }

    private async getEventsWithAttendeeCountFiltered(filter?: ListEvents) {
        let query = this.getEventsWithAttendeeCountQuery();
        if (!filter) {
            return query;
        }
        if (filter.when == WhenEventFilter.Today) {
            query = query.andWhere(`e.when >= current_date and e.when <= current_date + 1`)
        }
        if (filter.when == WhenEventFilter.Tomorrow) {
            query = query.andWhere(`e.when >= current_date + 1 and e.when <= current_date + 2`)
        }
        if (filter.when == WhenEventFilter.ThisWeek) {
            query = query.andWhere(`extract('week' from e.when) = extract('week' from current_date)`)
        }
        if (filter.when == WhenEventFilter.NextWeek) {
            query = query.andWhere(`extract('week' from e.when) = extract('week' from current_date) + 1`)
        }

        return query;
    }

    public async getEventsWithAttendeeCountFilteredPaginated(filter: ListEvents, paginateOptions: PaginateOptions) {
        return await paginate(await this.getEventsWithAttendeeCountFiltered(filter), paginateOptions);
    }

    public async getEvent(id: number): Promise<Event> | undefined {
        const query = this.getEventsWithAttendeeCountQuery()
            .andWhere('e.id = :id', { id });
        this.logger.debug(query.getSql());
        return await query.getOne();
    }

    public async createEvent(input: CreateEventDto, user: User): Promise<Event> {
        return await this.eventsRepository.save({
            ...input,
            organizer: user,
            when: new Date(input.when),
        });
    }

    public async updateEvent(input: UpdateEventDto, event: Event): Promise<Event> {
        return await this.eventsRepository.save({
            ...event,
            ...input,
            when: input.when ? new Date(input.when) : event.when
        });
    }

    public async deleteEvent(id: number): Promise<DeleteResult> {
        return await this.eventsRepository.createQueryBuilder('e')
            .delete().where('id = :id', { id }).execute();
    }
}