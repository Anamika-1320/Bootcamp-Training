"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var EventsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const event_entity_1 = require("./event.entity");
const attendee_entity_1 = require("./attendee.entity");
const typeorm_2 = require("typeorm");
const common_1 = require("@nestjs/common");
const list_events_1 = require("./input/list.events");
const paginator_1 = require("../pagination/paginator");
let EventsService = exports.EventsService = EventsService_1 = class EventsService {
    constructor(eventsRepository, attendeeRepository) {
        this.eventsRepository = eventsRepository;
        this.attendeeRepository = attendeeRepository;
        this.logger = new common_1.Logger(EventsService_1.name);
    }
    getEventsBaseQuery() {
        return this.eventsRepository.createQueryBuilder('e')
            .orderBy('e.id', 'DESC');
    }
    getEventsWithAttendeeCountQuery() {
        return this.getEventsBaseQuery()
            .loadRelationCountAndMap('e.attendeeCount', 'e.attendees')
            .loadRelationCountAndMap('e.attendeeAccepted', 'e.attendees', 'attendee', (qb) => qb.where('attendee.answer = :answer', { answer: attendee_entity_1.AttendeeAnswerEnum.Accepted }))
            .loadRelationCountAndMap('e.attendeeMaybe', 'e.attendees', 'attendee', (qb) => qb.where('attendee.answer = :answer', { answer: attendee_entity_1.AttendeeAnswerEnum.Maybe }))
            .loadRelationCountAndMap('e.attendeeRejected', 'e.attendees', 'attendee', (qb) => qb.where('attendee.answer = :answer', { answer: attendee_entity_1.AttendeeAnswerEnum.Rejected }));
    }
    async getEventsWithAttendeeCountFiltered(filter) {
        let query = this.getEventsWithAttendeeCountQuery();
        if (!filter) {
            return await query;
        }
        if (filter.when == list_events_1.WhenEventFilter.Today) {
            query = query.andWhere(`e.when >= current_date and e.when <= current_date + 1`);
        }
        if (filter.when == list_events_1.WhenEventFilter.Tomorrow) {
            query = query.andWhere(`e.when >= current_date + 1 and e.when <= current_date + 2`);
        }
        if (filter.when == list_events_1.WhenEventFilter.ThisWeek) {
            query = query.andWhere(`extract('week' from e.when) = extract('week' from current_date)`);
        }
        if (filter.when == list_events_1.WhenEventFilter.NextWeek) {
            query = query.andWhere(`extract('week' from e.when) = extract('week' from current_date) + 1`);
        }
        return await query;
    }
    async getEventsWithAttendeeCountFilteredPaginated(filter, paginateOptions) {
        return await (0, paginator_1.paginate)(await this.getEventsWithAttendeeCountFiltered(filter), paginateOptions);
    }
    async getEvent(id) {
        const query = this.getEventsWithAttendeeCountQuery()
            .andWhere('e.id = :id', { id });
        this.logger.debug(query.getSql());
        return await query.getOne();
    }
    async createEvent(input, user) {
        return await this.eventsRepository.save({
            ...input,
            organizer: user,
            when: new Date(input.when),
        });
    }
    async updateEvent(input, event) {
        return await this.eventsRepository.save({
            ...event,
            ...input,
            when: input.when ? new Date(input.when) : event.when
        });
    }
    async deleteEvent(id) {
        return await this.eventsRepository.createQueryBuilder('e')
            .delete().where('id = :id', { id }).execute();
    }
};
exports.EventsService = EventsService = EventsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(event_entity_1.Event)),
    __param(1, (0, typeorm_1.InjectRepository)(attendee_entity_1.Attendee)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], EventsService);
//# sourceMappingURL=events.service.js.map