import { Controller, Post, UseGuards, Request, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { CurrentUser } from "./current-user.decorator";
import { User } from "./user.entity";
import { AuthGuardJwt } from "./auth-guard.jwt";
import { AuthGuardLocal } from './auth-guard.local';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) { }

    @Post('login')
    @UseGuards(AuthGuardLocal)
    async login(@CurrentUser() user: User) {
        return {
            userId: user.id,
            token: this.authService.getTokenForUser(user)
        }
    }

    @Get('profile')
    @UseGuards(AuthGuardJwt)
    async getProfile(@CurrentUser() user: User) {
        return user;
    }
}