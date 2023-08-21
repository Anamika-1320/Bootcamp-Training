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
exports.TrainingController = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const subject_entity_1 = require("./subject.entity");
const teacher_entity_1 = require("./teacher.entity");
let TrainingController = exports.TrainingController = class TrainingController {
    constructor(subjectRepository, teacherRepository) {
        this.subjectRepository = subjectRepository;
        this.teacherRepository = teacherRepository;
    }
    async savingRelation() {
        const subject = await this.subjectRepository.findOne({ where: { id: 2 } });
        const teacher1 = await this.teacherRepository.findOne({ where: { id: 3 } });
        const teacher2 = await this.teacherRepository.findOne({ where: { id: 4 } });
        return await this.subjectRepository
            .createQueryBuilder()
            .relation(subject_entity_1.Subject, 'teachers')
            .of(subject)
            .add([teacher1, teacher2]);
    }
    async removingRelation() {
        await this.subjectRepository.createQueryBuilder('s')
            .update()
            .set({ name: "Confidential" })
            .execute();
    }
};
__decorate([
    (0, common_1.Post)('/create'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "savingRelation", null);
__decorate([
    (0, common_1.Post)('/remove'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TrainingController.prototype, "removingRelation", null);
exports.TrainingController = TrainingController = __decorate([
    (0, common_1.Controller)('school'),
    __param(0, (0, typeorm_1.InjectRepository)(subject_entity_1.Subject)),
    __param(1, (0, typeorm_1.InjectRepository)(teacher_entity_1.Teacher)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TrainingController);
//# sourceMappingURL=training.controller.js.map