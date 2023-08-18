"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const event_entity_1 = require("../events/event.entity");
const attendee_entity_1 = require("../events/attendee.entity");
const subject_entity_1 = require("../school/subject.entity");
const teacher_entity_1 = require("../school/teacher.entity");
exports.default = (0, config_1.registerAs)('orm.config', () => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [event_entity_1.Event, attendee_entity_1.Attendee, subject_entity_1.Subject, teacher_entity_1.Teacher],
    synchronize: false,
}));
//# sourceMappingURL=orm.config.prod.js.map