"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NewsService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
let NewsService = exports.NewsService = class NewsService {
    constructor() {
        this.apiKey = 'e68440ca00fc4a53aca999f31a1edbe1';
        this.apiUrl = 'http://newsapi.org/v2/top-headlines';
    }
    async getNews() {
        try {
            const response = await axios_1.default.get(this.apiUrl, {
                params: {
                    apiKey: this.apiKey,
                    country: 'us',
                },
            });
            return response.data.articles;
        }
        catch (error) {
            console.error('Error fetching news:', error);
            return [];
        }
    }
};
exports.NewsService = NewsService = __decorate([
    (0, common_1.Injectable)()
], NewsService);
//# sourceMappingURL=news.service.js.map