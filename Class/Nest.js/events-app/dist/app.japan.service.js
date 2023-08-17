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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppJapanService = void 0;
const common_1 = require("@nestjs/common");
let AppJapanService = exports.AppJapanService = class AppJapanService {
    constructor(name, message) {
        this.name = name;
        this.message = message;
    }
    getHello() {
        return `こんにちは世界 from ${this.name}, ${this.message}`;
    }
};
exports.AppJapanService = AppJapanService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)('APP_NAME')),
    __param(1, (0, common_1.Inject)('MESSAGE')),
    __metadata("design:paramtypes", [String, String])
], AppJapanService);
//# sourceMappingURL=app.japan.service.js.map