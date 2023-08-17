"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const event_entity_1 = require("../events/event.entity");
exports.default = (0, config_1.registerAs)('orm.config', () => ({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [event_entity_1.Event],
    synchronize: false,
}));
//# sourceMappingURL=orm.config.prod.js.map