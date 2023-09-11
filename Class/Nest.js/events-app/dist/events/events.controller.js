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
var EventsController_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsController = void 0;
const common_1 = require("@nestjs/common");
const create_event_dto_1 = require("./input/create-event.dto");
const update_event_dto_1 = require("./input/update-event.dto");
const events_service_1 = require("./events.service");
const list_events_1 = require("./input/list.events");
const current_user_decorator_1 = require("../auth/current-user.decorator");
const user_entity_1 = require("../auth/user.entity");
const auth_guard_jwt_1 = require("../auth/auth-guard.jwt");
let EventsController = exports.EventsController = EventsController_1 = class EventsController {
    constructor(eventsService) {
        this.eventsService = eventsService;
        this.logger = new common_1.Logger(EventsController_1.name);
    }
    async findAll(filter) {
        const events = await this.eventsService.getEventsWithAttendeeCountFilteredPaginated(filter, {
            total: true,
            currentPage: filter.page,
            limit: 3
        });
        return events;
    }
    async findOne(id) {
        const event = await this.eventsService.getEvent(id);
        if (!event) {
            throw new common_1.NotFoundException();
        }
        return event;
    }
    async create(input, user) {
        return await this.eventsService.createEvent(input, user);
    }
    async update(id, input, user) {
        const event = await this.eventsService.getEvent(id);
        if (!event) {
            throw new common_1.NotFoundException();
        }
        if (event.organizerId !== user.id) {
            throw new common_1.ForbiddenException(null, `You are not authorized to change this event.`);
        }
        return await this.eventsService.updateEvent(input, event);
    }
    async remove(id, user) {
        const event = await this.eventsService.getEvent(id);
        if (!event) {
            throw new common_1.NotFoundException();
        }
        if (event.organizerId !== user.id) {
            throw new common_1.ForbiddenException(null, `You are not authorized to delete this event.`);
        }
        await this.eventsService.deleteEvent(id);
    }
};
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [list_events_1.ListEvents]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_event_dto_1.CreateEventDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, update_event_dto_1.UpdateEventDto, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)(auth_guard_jwt_1.AuthGuardJwt),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, current_user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_entity_1.User]),
    __metadata("design:returntype", Promise)
], EventsController.prototype, "remove", null);
exports.EventsController = EventsController = EventsController_1 = __decorate([
    (0, common_1.Controller)('/events'),
    __metadata("design:paramtypes", [events_service_1.EventsService])
], EventsController);
//# sourceMappingURL=events.controller.js.map